(function(){
  /* =========================================================
     CLOUDA OCR WEBSITE — CENTRAL LINK & CONTACT CONFIG
     Single source for contact routing. Buttons in the HTML
     carry data-contact-type; this config generates their
     Gmail Compose href at runtime. The static href inside
     each HTML button is the same URL, kept as a no-JS
     fallback, and is generated from this same mapping.
     ========================================================= */
  const CONTACT_EMAILS = {
    general: 'contact@cloudaocr.xyz',
    infrastructure: 'contact@cloudaocr.xyz',
    funding: 'contact@cloudaocr.xyz',
    partnership: 'contact@cloudaocr.xyz',
    strategic: 'contact@cloudaocr.xyz',
    research: 'sohair@cloudaocr.xyz',
    founder: 'sohair@cloudaocr.xyz'
  };

  function gmailCompose(type){
    const messages = {
      general: {
        subject: 'Clouda OCR — General Inquiry',
        body: "Hello,\n\nI'm contacting Clouda OCR regarding a general inquiry.\n\nDetails:\n\n"
      },
      infrastructure: {
        subject: 'Clouda OCR — Infrastructure Support',
        body: "Hello,\n\nI'm contacting Clouda OCR regarding infrastructure support.\n\nType of infrastructure:\nDetails:\n\n"
      },
      funding: {
        subject: 'Clouda OCR — Funding Support',
        body: "Hello,\n\nI'm contacting Clouda OCR regarding financial/project support.\n\nDetails:\n\n"
      },
      partnership: {
        subject: 'Clouda OCR — Partnership Inquiry',
        body: "Hello,\n\nI'm contacting Clouda OCR regarding a potential partnership or collaboration.\n\nOrganization:\nPurpose:\nDetails:\n\n"
      },
      strategic: {
        subject: 'Clouda OCR — Strategic Funding Discussion',
        body: "Hello,\n\nI'd like to start a strategic funding conversation about Clouda OCR.\n\nOrganization:\nFocus (infrastructure, evaluation, research, other):\nDetails:\n\n"
      },
      research: {
        subject: 'Clouda OCR — Research Inquiry',
        body: "Hello Sohair,\n\nI'm contacting you regarding Clouda OCR research / benchmark work.\n\nTopic:\nDetails:\n\n"
      },
      founder: {
        subject: 'Clouda OCR — Founder Contact',
        body: "Hello Sohair,\n\nI'm contacting you regarding Clouda OCR.\n\nDetails:\n\n"
      }
    };
    const msg = messages[type];
    const to = CONTACT_EMAILS[type];
    if (!msg || !to) return null;
    const params = new URLSearchParams({
      view: 'cm',
      fs: '1',
      to: to,
      su: msg.subject,
      body: msg.body
    });
    return 'https://mail.google.com/mail/?' + params.toString();
  }

  /* Apply contextual Gmail Compose destinations to every contact button. */
  function applyContactLinks(){
    document.querySelectorAll('a[data-contact-type]').forEach(a => {
      const href = gmailCompose(a.getAttribute('data-contact-type'));
      if (!href) return;
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    });
  }

  /* Mobile navigation */
  const b=document.querySelector('.mobile-menu-btn'),m=document.querySelector('.mobile-menu');
  if(b&&m){
    b.addEventListener('click',()=>{const o=m.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false')});
    m.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{m.classList.remove('open');b.setAttribute('aria-expanded','false')}));
    document.addEventListener('click',e=>{if(m.classList.contains('open')&&!m.contains(e.target)&&!b.contains(e.target)){m.classList.remove('open');b.setAttribute('aria-expanded','false')}});
  }

  applyContactLinks();

  /* Single source of status data: project-status.json fills [data-status] elements.
     Static text inside each element is the same value, kept as a no-JS fallback. */
  fetch('project-status.json')
    .then(r=>{if(!r.ok)throw new Error('status http '+r.status);return r.json()})
    .then(s=>{
      document.querySelectorAll('[data-status]').forEach(el=>{
        const path=el.getAttribute('data-status').split('.');
        let v=s;
        for(const k of path){if(v==null||typeof v!=='object'){v=undefined;break}v=v[k]}
        if(v!==undefined&&v!==null)el.textContent=String(v);
      });
    })
    .catch(()=>{/* status values stay at their static fallback */});
})();
