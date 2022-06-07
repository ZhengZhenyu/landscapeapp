addEventListener('message', function(e) {
  if (e.data && e.data.type === 'landscapeapp-resize') {
    document.querySelector('#landscape').style.height = e.data.height + 'px';
  }
  if (e.data && e.data.type === 'landscapeapp-show') {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    window.landscapeappModalIframe = iframe;
    const search = e.data.location.search || '?a=a';
    const src = e.data.location.pathname.replace('/pages/', '/pages-modal/') + search + '&selected=' + e.data.selected;
    iframe.src = src;
    iframe.style.position = 'fixed';
    iframe.style.left = 0;
    iframe.style.top = 0;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.focus();
  }
  if (e.data && e.data.type === 'landscapeapp-hide') {
    const iframe = window.landscapeappModalIframe;
    if (iframe) {
      document.body.removeChild(iframe);
    }
  }
});
