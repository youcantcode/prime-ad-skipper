//chrome.action.onClicked.addListener(function (tab) {
//	chrome.scripting.executeScript(tab.ib, {
//		file: 'inject.js'
//	});
//    
//});

//chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
//  if (changeInfo.status == 'complete') {
//	      console.log("HERE");
//    chrome.scripting.executeScript(tab.ib, {
//		file: 'inject.js'
//	}, () => chrome.runtime.lastError);
//  }
//})

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    chrome.scripting.executeScript(
    {
      target: {tabId: tabId},
      files: ['inject.js'],
    }, () => chrome.runtime.lastError);
  }
})