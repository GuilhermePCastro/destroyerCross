/**
 * ============================================================================
 * DESTROYER CROSS - INTERAÇÕES, ANIMAÇÕES E OTIMIZAÇÃO DE CONVERSÃO (CRO)
 * Zero dependências externas | Foco em Core Web Vitals (INP / CLS)
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  /* --------------------------------------------------------------------------
     1. INTERSECTION OBSERVER (Animações suaves ao rolar a página)
     -------------------------------------------------------------------------- */
  const elementosAnimados = document.querySelectorAll(
    '.animar-cima, .animar-esquerda, .animar-direita'
  );

  if ('IntersectionObserver' in window) {
    const observerOpcoes = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.15,
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visivel');
          // Desobserva após animar a primeira vez para economizar recursos
          observer.unobserve(entry.target);
        }
      });
    }, observerOpcoes);

    elementosAnimados.forEach((el) => scrollObserver.observe(el));
  } else {
    // Fallback para navegadores antigos
    elementosAnimados.forEach((el) => el.classList.add('visivel'));
  }

  /* --------------------------------------------------------------------------
     2. MENU MOBILE RESPONSIVO (Hambúrguer Toggle + Acessibilidade)
     -------------------------------------------------------------------------- */
  const btnMenuMobile = document.getElementById('btn-menu-mobile');
  const menuMobile = document.getElementById('menu-mobile');
  const iconeAbrir = document.getElementById('icone-menu-abrir');
  const iconeFechar = document.getElementById('icone-menu-fechar');

  const alternarMenuMobile = (forcarFechamento = false) => {
    if (!btnMenuMobile || !menuMobile) return;

    const estaAberto = btnMenuMobile.getAttribute('aria-expanded') === 'true';
    const novoEstado = forcarFechamento ? false : !estaAberto;

    btnMenuMobile.setAttribute('aria-expanded', String(novoEstado));

    if (novoEstado) {
      menuMobile.classList.remove('hidden');
      iconeAbrir?.classList.add('hidden');
      iconeFechar?.classList.remove('hidden');
    } else {
      menuMobile.classList.add('hidden');
      iconeAbrir?.classList.remove('hidden');
      iconeFechar?.classList.add('hidden');
    }
  };

  if (btnMenuMobile && menuMobile) {
    btnMenuMobile.addEventListener('click', () => alternarMenuMobile());

    // Fecha o menu ao clicar em qualquer link interno do menu mobile
    const linksMobile = menuMobile.querySelectorAll('a');
    linksMobile.forEach((link) => {
      link.addEventListener('click', () => alternarMenuMobile(true));
    });

    // Fecha o menu ao pressionar a tecla ESC
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        alternarMenuMobile(true);
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. ACORDEÃO INTERATIVO DE FAQ (Quebra de Objeções Final)
     -------------------------------------------------------------------------- */
  const faqItens = document.querySelectorAll('.faq-item');

  faqItens.forEach((item) => {
    const botaoGatilho = item.querySelector('.faq-gatilho');
    if (!botaoGatilho) return;

    botaoGatilho.addEventListener('click', () => {
      const jaEstaAtivo = item.classList.contains('ativo');

      // Fecha os demais itens para manter leitura limpa e focada
      faqItens.forEach((outroItem) => {
        outroItem.classList.remove('ativo');
        const outroBotao = outroItem.querySelector('.faq-gatilho');
        if (outroBotao) {
          outroBotao.setAttribute('aria-expanded', 'false');
        }
      });

      // Se o item clicado não estava ativo, abre ele
      if (!jaEstaAtivo) {
        item.classList.add('ativo');
        botaoGatilho.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* --------------------------------------------------------------------------
     4. HEADER STICKY REFINAMENTO VISUAL NO SCROLL
     -------------------------------------------------------------------------- */
  const headerPrincipal = document.getElementById('header-principal');
  if (headerPrincipal) {
    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 24) {
          headerPrincipal.classList.add('shadow-2xl', 'shadow-black/80', 'border-brand-orange/25');
          headerPrincipal.classList.remove('border-white/10');
        } else {
          headerPrincipal.classList.remove('shadow-2xl', 'shadow-black/80', 'border-brand-orange/25');
          headerPrincipal.classList.add('border-white/10');
        }
      },
      { passive: true }
    );
  }

  /* --------------------------------------------------------------------------
     5. FORMULÁRIO DE AGENDAMENTO DIRETO NO WHATSAPP (contato-e-experimental.html)
     -------------------------------------------------------------------------- */
  const formExperimental = document.getElementById('form-experimental');
  if (formExperimental) {
    formExperimental.addEventListener('submit', (event) => {
      event.preventDefault();

      const nome = document.getElementById('nome-aluno')?.value?.trim() || 'Visitante';
      const nivel = document.getElementById('nivel-aluno')?.value || 'Iniciante';
      const horario = document.getElementById('horario-aluno')?.value || 'A combinar';
      const objetivo = document.getElementById('objetivo-aluno')?.value || 'Saúde e Condicionamento';

      const mensagem = `Olá! Vim pelo site da Destroyer Cross e quero agendar minha Aula Experimental Gratuita!\n\n*Nome:* ${nome}\n*Nível:* ${nivel}\n*Horário de preferência:* ${horario}\n*Objetivo:* ${objetivo}`;
      const urlWhatsapp = `https://wa.me/5511995217571?text=${encodeURIComponent(mensagem)}`;

      window.open(urlWhatsapp, '_blank', 'noopener,noreferrer');
    });
  }
});

