const words = ['closer', 'than', 'you', 'might', 'think.'];
let previewShown = true;
function drawPreview() {
  const amount = Number(document.querySelector('#exampleAmount').value);
  document.querySelector('#exampleHint').textContent = previewShown ? words.slice(0, amount || words.length).join(' ') : '';
  const button = document.querySelector('#exampleToggle');
  button.textContent = previewShown ? 'Hide preview' : 'Show preview';
  button.setAttribute('aria-pressed', String(previewShown));
}
document.querySelector('#exampleAmount').addEventListener('change', drawPreview);
document.querySelector('#exampleToggle').addEventListener('click', () => { previewShown = !previewShown; drawPreview(); });
for (const button of document.querySelectorAll('[data-method]')) button.addEventListener('click', () => {
  const zip = button.dataset.method === 'zip';
  document.querySelectorAll('[data-method]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  document.querySelector('#stepOneTitle').textContent = zip ? 'Download and extract the portable ZIP.' : 'Download and run the installer.';
  document.querySelector('#stepOneText').textContent = zip ? 'Download the portable ZIP above. Extract it to a permanent folder you will keep, such as Documents/GoogleDocs. Do not load it from inside the ZIP.' : 'Run Google-Docs-Setup-2.2.1.exe. It installs for your Windows account without administrator access. Open the setup guide when it finishes.';
  document.querySelector('#unsignedNote').hidden = zip;
  document.querySelector('#installPath').hidden = zip;
  document.querySelector('#stepThreeText').textContent = zip ? 'Inside the folder you extracted, select the folder named extension (the one containing manifest.json). Keep this folder in place after installation.' : 'Select the extension folder below. The installer’s setup guide also gives you a full, copyable path.';
});
let copyTimer;
for (const button of document.querySelectorAll('[data-copy]')) button.addEventListener('click', async () => {
  const status = document.querySelector('#copyStatus'); clearTimeout(copyTimer);
  try { await navigator.clipboard.writeText(button.dataset.copy); status.textContent = 'Copied. Paste it into Chrome.'; }
  catch { const range = document.createRange(); range.selectNodeContents(button.previousElementSibling); const selection = getSelection(); selection.removeAllRanges(); selection.addRange(range); status.textContent = 'Text selected. Press Ctrl+C or Cmd+C to copy.'; }
  copyTimer = setTimeout(() => { status.textContent = ''; }, 4500);
});
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('seen'); observer.unobserve(entry.target); } }), {threshold: 0.08});
  document.querySelectorAll('.reveal').forEach(el => { el.classList.add('animate'); observer.observe(el); });
}
