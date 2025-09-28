const SHEET_NAME = 'Лист1'; 
const WEIGHT_COL = 'Вес (кг)';
const PRICE_COL  = 'Цена за 1кг';
const COST_COL   = 'Стоимость (₸)';

function getBoundSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Active spreadsheet not found. Скрипт должен быть привязан к Google Sheet (Extensions → Apps Script из нужной таблицы).');
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Лист "' + SHEET_NAME + '" не найден. Проверьте название вкладки внизу Google Sheets.');
  return sheet;
}

function getAllValues() {
  const sheet = getBoundSheet();
  return sheet.getDataRange().getValues();
}

function recalcCosts() {
  const sheet = getBoundSheet();
  const range = sheet.getDataRange();
  const values = range.getValues();
  if (!values || values.length < 2) return;

  let headers = values[0].map(h => String(h || '').trim());
  const idxWeight = headers.indexOf(WEIGHT_COL);
  const idxPrice  = headers.indexOf(PRICE_COL);
  let idxCost     = headers.indexOf(COST_COL);

  if (idxWeight === -1 || idxPrice === -1) {
    throw new Error('Не найдены колонки "' + WEIGHT_COL + '" или "' + PRICE_COL + '" в заголовке.');
  }

  if (idxCost === -1) {
    idxCost = headers.length;
    sheet.getRange(1, idxCost + 1).setValue(COST_COL);
    headers.push(COST_COL);
  }

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const costs = [];
  for (let r = 2; r <= lastRow; r++) {
    const w = Number(sheet.getRange(r, idxWeight + 1).getValue()) || 0;
    const p = Number(sheet.getRange(r, idxPrice + 1).getValue()) || 0;
    const cost = (w || p) ? Math.round(w * p) : '';
    costs.push([cost]);
  }

  sheet.getRange(2, idxCost + 1, costs.length, 1).setValues(costs);
}

function doGet(e) {
  try {
    recalcCosts();

    const values = getAllValues();
    if (!values || values.length < 1) {
      return _output(e, JSON.stringify({ success: false, error: 'no data' }));
    }
    const headers = values[0].map(h => String(h || '').trim());
    const rows = values.slice(1).map(r => {
      const obj = {};
      headers.forEach((h, i) => obj[h] = r[i]);
      return obj;
    });

    return _output(e, JSON.stringify({ success: true, data: rows }));
  } catch (err) {
    return _output(e, JSON.stringify({ success: false, error: String(err.message) }));
  }
}

function _output(e, jsonString) {
  const callback = e && e.parameter && e.parameter.callback ? String(e.parameter.callback) : null;
  if (callback) {
    return ContentService.createTextOutput(callback + '(' + jsonString + ')')
                         .setMimeType(ContentService.MimeType.JAVASCRIPT);
  } else {
    return ContentService.createTextOutput(jsonString)
                         .setMimeType(ContentService.MimeType.JSON);
  }
}

function onEdit(e) {
  try {
    recalcCosts();
  } catch (err) {
    Logger.log('onEdit error: ' + err);
  }
}
