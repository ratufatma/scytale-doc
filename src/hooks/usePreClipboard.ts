import { useEffect, RefObject } from 'react';

/**
 * Utility hook that ensures any <pre> elements inside a container element
 * display a sleek floating 'Copy to Clipboard' button on hover.
 */
export function usePreClipboard(
  containerRef: RefObject<HTMLElement | null>,
  language: string = 'en'
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const copyLabel = language === 'id' ? 'Salin' : 'Copy';
    const copiedLabel = language === 'id' ? 'Tersalin' : 'Copied';

    const preElements = container.querySelectorAll('pre');

    preElements.forEach((pre, index) => {
      // If already processed or parent already contains a copy button, skip
      if (pre.getAttribute('data-pre-copy-bound') === 'true') return;
      if (pre.parentElement?.querySelector('[data-pre-copy-btn="true"]')) return;

      const parent = pre.parentElement;
      if (!parent) return;

      // Ensure the parent container is relative and acts as a hover group
      if (!parent.classList.contains('relative')) {
        parent.classList.add('relative');
      }
      if (!parent.classList.contains('group/pre')) {
        parent.classList.add('group/pre');
      }

      // Create floating copy button
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('data-pre-copy-btn', 'true');
      btn.setAttribute('aria-label', copyLabel);
      btn.title = language === 'id' ? 'Salin kode ke papan klip' : 'Copy code to clipboard';
      btn.className =
        'absolute top-2.5 right-2.5 opacity-0 group-hover/pre:opacity-100 focus:opacity-100 transition-opacity duration-200 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded-md cursor-pointer select-none bg-zinc-800/90 hover:bg-zinc-700/95 text-zinc-200 hover:text-white border border-zinc-700 hover:border-zinc-500 shadow-xs backdrop-blur-xs';

      btn.innerHTML = `
        <svg class="w-3.5 h-3.5 text-zinc-400 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
        <span class="text-[11px]">${copyLabel}</span>
      `;

      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const codeText = pre.textContent || '';
        try {
          if (navigator?.clipboard?.writeText) {
            await navigator.clipboard.writeText(codeText);
          } else {
            const textarea = document.createElement('textarea');
            textarea.value = codeText;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
          }

          // Visual feedback
          btn.className =
            'absolute top-2.5 right-2.5 opacity-100 transition-opacity duration-200 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded-md cursor-pointer select-none bg-emerald-950/90 text-emerald-300 border border-emerald-700/80 shadow-emerald-950/30 backdrop-blur-xs';
          btn.innerHTML = `
            <svg class="w-3.5 h-3.5 text-emerald-400 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span class="text-[11px] font-mono">${copiedLabel}</span>
          `;

          setTimeout(() => {
            btn.className =
              'absolute top-2.5 right-2.5 opacity-0 group-hover/pre:opacity-100 focus:opacity-100 transition-opacity duration-200 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded-md cursor-pointer select-none bg-zinc-800/90 hover:bg-zinc-700/95 text-zinc-200 hover:text-white border border-zinc-700 hover:border-zinc-500 shadow-xs backdrop-blur-xs';
            btn.innerHTML = `
              <svg class="w-3.5 h-3.5 text-zinc-400 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
              <span class="text-[11px]">${copyLabel}</span>
            `;
          }, 2000);
        } catch (err) {
          console.error('Failed to copy text', err);
        }
      });

      parent.appendChild(btn);
      pre.setAttribute('data-pre-copy-bound', 'true');
    });
  }, [containerRef, language]);
}
