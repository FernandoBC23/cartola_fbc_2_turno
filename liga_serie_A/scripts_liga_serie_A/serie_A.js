// scripts/serie_A.js
(function () {
  "use strict";

  window.addEventListener("DOMContentLoaded", () => {

    // ================================
    // Config e utilitários
    // ================================
    const TURNO_INICIO  = 20;                  // 2º turno começa na 20
    const TURNO_OFFSET  = TURNO_INICIO - 1;    // 19 (UI 1 → real 20)
    const RODADA_MAXIMA = (() => {
      try {
        const maxCsv = Math.max(...(confrontosFase1 || []).map(j => +j.rodada || 0));
        return Number.isFinite(maxCsv) && maxCsv > 0 ? maxCsv : 19;
      } catch { return 19; }
    })();

    const painelGrupos = document.getElementById("painel-grupos");

    const escudosTimes = {
      "A Lenda Super Vasco F.c": "../imagens/2_a_lenda_super_vasco_fc.png",
      "Analove10 ITAQUI GRANDE!!": "../imagens/2_analove10_itaqui_grande.png",
      "BORGES ITAQUI F.C.": "../imagens/2_borges_itaqui_fc.png",
      "DM Studio": "../imagens/2_dm_studio.png",
      "Dom Camillo68": "../imagens/2_dom_camillo68.png",
      "FBC Colorado": "../imagens/2_fbc_colorado.png",
      "Fedato Futebol Clube": "../imagens/2_fedato_futebol_clube.png",
      "Gremiomaniasm": "../imagens/2_gremiomaniasm.png",
      "MauHumor F.C.": "../imagens/2_mauhumor_fc.png",
      "RHANKA DENTY FC25": "../imagens/2_rhanka_denty_fc25.png",
      "Rolo Compressor ZN": "../imagens/2_rolo_compressor_zn.png",
      "TEAM LOPES 99": "../imagens/2_team_lopes_99.png",
      "TIGRE LEON": "../imagens/2_tigre_leon.png",
      "Tatols Beants F.C": "../imagens/2_tatols_beants_fc.png",
      "Texas Club 2025": "../imagens/2_texas_club_2025.png",
      "Time do S.A.P.O": "../imagens/2_time_do_sapo.png",
      "cartola scheuer": "../imagens/2_cartola_scheuer.png",
      "lsauer fc": "../imagens/2_lsauer_fc.png",
      "pura bucha /botafogo": "../imagens/2_pura_bucha_botafogo.png",
      "seralex": "../imagens/2_seralex.png",
    };

    const formatPts = (n) => Number.isFinite(n) ? n.toFixed(2) : "?";

    function slugify(nome) {
      return (nome || "")
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "_").replace(/[^\w\-]/g, "")
        .replace(/_+/g, "_").replace(/^_+|_+$/g, "")
        .toLowerCase();
    }
    function escudoSrc(nome) {
      return escudosTimes[nome] || `../imagens/2_${slugify(nome)}.png`;
    }
    function toNum(x) {
      if (typeof x === "number") return Number.isFinite(x) ? x : NaN;
      if (typeof x === "string" && x.trim() !== "") {
        const n = Number(x.replace(",", "."));
        return Number.isFinite(n) ? n : NaN;
      }
      return NaN;
    }
    function getParcial(nomeTime, rodadaUI) {
      const col = `Rodada ${rodadaUI + TURNO_OFFSET}`;
      const mapa = window.pontuacoesPorRodada || {};
      return toNum(mapa?.[nomeTime]?.[col]);
    }
    function isParcial(rodadaUI) {
      const col = `Rodada ${rodadaUI + TURNO_OFFSET}`;
      const mapa = window.pontuacoesPorRodada || {};
      const vals = Object.values(mapa).map(m => toNum(m?.[col]));
      const filled = vals.filter(Number.isFinite).length;
      return filled > 0 && filled < vals.length;
    }

    function renderBannerParcial(container, rodadaUI) {
      if (!isParcial(rodadaUI)) return;

      const aviso = document.createElement("div");
      aviso.id = "aviso-parcial-rodada";
      aviso.className = "aviso-parcial";
      aviso.innerHTML = `
        <span style="font-size:1.1rem;margin-right:.5rem">⏳</span>
        <strong>Rodada ${rodadaUI} em andamento:</strong>
        pontuações <strong>parciais</strong> — o resultado ainda não é definitivo.
      `;
      aviso.style.cssText = [
        "margin:0 0 16px 0",
        "padding:10px 14px",
        "background:#ffe7cc",
        "border:1px solid #ffcf91",
        "color:#4a2d00",
        "border-radius:10px",
        "font-weight:600"
      ].join(";");

      container.appendChild(aviso);
    }


    // rodada inicial inteligente: maior rodada com final OU parcial
    let rodadaAtual = (() => {
      const finals = (resultadosFase1 || [])
        .filter(r => Number.isFinite(r?.mandante?.pontos) && Number.isFinite(r?.visitante?.pontos))
        .map(r => +r.rodada || 0);
      const maxFinal = finals.length ? Math.max(...finals) : 0;

      const mapa = window.pontuacoesPorRodada || {};
      const cols = new Set();
      Object.values(mapa).forEach(m => {
        Object.keys(m || {}).forEach(k => {
          const n = parseInt((k || "").replace("Rodada ", ""), 10);
          if (Number.isFinite(n) && n >= 20 && n <= 38) cols.add(n);
        });
      });
      const maxParcialUI = cols.size ? Math.max(...cols) - TURNO_OFFSET : 0;

      const guess = Math.max(maxFinal, maxParcialUI);
      return (guess > 0 && guess <= RODADA_MAXIMA) ? guess : 1;
    })();

    // ================================
    // Renderização
    // ================================
    function renderPainelCompleto(numeroRodada) {
      painelGrupos.innerHTML = "";

      // banner de rodada parcial (se aplicável)
      renderBannerParcial(painelGrupos, numeroRodada);

      const tituloBadge = isParcial(numeroRodada) ? " • PARCIAL" : "";

      // --- agrupamento de confrontos por grupo ---
      const confrontosRodada = (confrontosFase1 || []).filter(j => +j.rodada === +numeroRodada);
      const resultadosRodadaFinal = (resultadosFase1 || []).filter(j => +j.rodada === +numeroRodada);

      const confrontosPorGrupo = {};
      confrontosRodada.forEach(j => {
        const g = j.grupo || "Série A";
        (confrontosPorGrupo[g] ||= []).push(j);
      });

      // --- cada grupo (tabela + confrontos) ---
      Object.entries(classificacaoSerieA || {}).forEach(([grupo, times]) => {
        const linha = document.createElement("div");
        linha.className = "linha-grupo";

        // ===== coluna esquerda: classificação =====
        const colunaEsq = document.createElement("div");
        colunaEsq.className = "coluna-esquerda";

        const grupoDiv = document.createElement("div");
        grupoDiv.className = "tabela-grupo";

        const tabela = document.createElement("table");
        tabela.className = "tabela-classificacao";
        tabela.innerHTML = `
          <thead>
            <tr>
              <th>Pos.</th><th>Time</th><th>Pts</th><th>J</th>
              <th>V</th><th>E</th><th>D</th><th>Total</th>
            </tr>
          </thead>`;
        const tbody = document.createElement("tbody");

        (times || []).forEach((time, idx) => {
          const tr = document.createElement("tr");
          if (idx <= 1) tr.classList.add("lider-grupo");
          tr.innerHTML = `
            <td>${time.posicao}</td>
            <td><div class="time-info">
              <img src="${escudoSrc(time.nome)}" class="escudo" alt="${time.nome}">
              ${time.nome}
            </div></td>
            <td>${time.pontos}</td>
            <td>${time.vitorias + time.empates + time.derrotas}</td>
            <td>${time.vitorias}</td>
            <td>${time.empates}</td>
            <td>${time.derrotas}</td>
            <td>${Number(time.totalCartola || 0).toFixed(2)}</td>`;
          tbody.appendChild(tr);
        });

        tabela.appendChild(tbody);
        grupoDiv.appendChild(tabela);
        colunaEsq.appendChild(grupoDiv);

        // navegação (topo da coluna esquerda)
        const navTop = document.createElement("div");
        navTop.className = "rodada-container";
        navTop.innerHTML = `
          <div class="navegacao-rodada">
            <button id="btn-anterior-top">◀️ Rodada Anterior</button>
            <div class="titulo-rodada" id="titulo-rodada-top">Rodada ${numeroRodada}${tituloBadge}</div>
            <button id="btn-proxima-top">Próxima Rodada ▶️</button>
          </div>`;
        colunaEsq.appendChild(navTop);

        // ===== coluna direita: confrontos da rodada (com parciais) =====
        const colunaDir = document.createElement("div");
        colunaDir.className = "coluna-direita";

        if (confrontosPorGrupo[grupo]) {
          const grupoConfrontos = document.createElement("div");
          grupoConfrontos.className = "grupo-confronto";

          confrontosPorGrupo[grupo].forEach(jogo => {
            const jDiv = document.createElement("div");
            jDiv.className = "jogo";

            const mand = jogo.mandante?.nome;
            const visi = jogo.visitante?.nome;

            // resultado final (se existir para esta rodada)
            const final = resultadosRodadaFinal.find(r =>
              r?.mandante?.nome === mand && r?.visitante?.nome === visi);

            const pMand = Number.isFinite(final?.mandante?.pontos)
              ? final.mandante.pontos
              : getParcial(mand, numeroRodada);

            const pVis  = Number.isFinite(final?.visitante?.pontos)
              ? final.visitante.pontos
              : getParcial(visi, numeroRodada);

            // escudos
            const t1 = document.createElement("div");
            t1.className = "time";
            t1.innerHTML = `<img src="${escudoSrc(mand)}" alt="${mand}">`;

            const t2 = document.createElement("div");
            t2.className = "time";
            t2.innerHTML = `<img src="${escudoSrc(visi)}" alt="${visi}">`;

            // placar
            const placar = document.createElement("div");
            placar.className = "placar";
            placar.innerHTML = `
              <span class="placar-numero">${formatPts(pMand)}</span>
              <span class="placar-x"> X </span>
              <span class="placar-numero">${formatPts(pVis)}</span>`;

            // status
            const resDiv = document.createElement("div");
            resDiv.className = "resultado";
            const span = document.createElement("span");
            span.className = "vencedor";

            if (!Number.isFinite(pMand) || !Number.isFinite(pVis)) {
              span.textContent = "🕒 Aguardando Confronto";
              span.style.backgroundColor = "#ffc107";
              span.style.color = "#000";
            } else if (pMand > pVis) {
              span.textContent = `✅ ${mand} venceu`;
            } else if (pMand < pVis) {
              span.textContent = `✅ ${visi} venceu`;
            } else {
              span.textContent = "🤝 Empate";
            }

            if (isParcial(numeroRodada)) {
              const badge = document.createElement("div");
              badge.textContent = "PARCIAL";
              badge.style.cssText = "margin-top:4px;font-size:.8rem;opacity:.85;";
              resDiv.appendChild(badge);
            }

            jDiv.appendChild(t1);
            jDiv.appendChild(placar);
            jDiv.appendChild(t2);
            resDiv.appendChild(span);

            grupoConfrontos.appendChild(jDiv);
            grupoConfrontos.appendChild(resDiv);
          });

          const separador = document.createElement("div");
          separador.className = "separador-grupo";
          grupoConfrontos.appendChild(separador);
          colunaDir.appendChild(grupoConfrontos);
        }

        linha.appendChild(colunaEsq);
        linha.appendChild(colunaDir);
        painelGrupos.appendChild(linha);
      });

      // navegação (rodapé da página)
      const navBottom = document.createElement("div");
      navBottom.className = "rodada-container";
      navBottom.innerHTML = `
        <div class="navegacao-rodada">
          <button id="btn-anterior-bottom">◀️ Rodada Anterior</button>
          <div class="titulo-rodada" id="titulo-rodada-bottom">Rodada ${numeroRodada}${tituloBadge}</div>
          <button id="btn-proxima-bottom">Próxima Rodada ▶️</button>
        </div>`;
      painelGrupos.appendChild(navBottom);

      // === resumo da rodada (usa final OU parcial) ===
      const jogosResumo = (confrontosFase1 || []).filter(j => +j.rodada === +numeroRodada);
      let maiorPontuacao = "", maiorTotal = -Infinity;
      let maiorDiferenca = "", difMax = -Infinity;
      let soma = 0, jogosValidos = 0;

      jogosResumo.forEach(j => {
        const mand = j.mandante?.nome, visi = j.visitante?.nome;
        const final = (resultadosFase1 || []).find(r =>
          +r.rodada === +numeroRodada &&
          r?.mandante?.nome === mand &&
          r?.visitante?.nome === visi);

        const a = Number.isFinite(final?.mandante?.pontos) ? final.mandante.pontos : getParcial(mand, numeroRodada);
        const b = Number.isFinite(final?.visitante?.pontos) ? final.visitante.pontos : getParcial(visi, numeroRodada);

        if (!Number.isFinite(a) || !Number.isFinite(b)) return;
        const tot = a + b, dif = Math.abs(a - b);

        if (tot > maiorTotal) {
          maiorTotal = tot;
          maiorPontuacao = `${mand} ${formatPts(a)} x ${formatPts(b)} ${visi}`;
        }
        if (dif > difMax) {
          difMax = dif;
          maiorDiferenca = `${mand} ${formatPts(a)} x ${formatPts(b)} ${visi}`;
        }
        soma += tot; jogosValidos += 1;
      });

      const media = jogosValidos ? (soma / (jogosValidos * 2)).toFixed(2) : "-";
      const resumo = document.createElement("div");
      resumo.className = "resumo-rodada";
      resumo.innerHTML = `
        <h3>Resumo da Rodada ${numeroRodada}${tituloBadge}</h3>
        <ul>
          <li><strong>Maior pontuação total:</strong> ${maiorPontuacao || "Aguardando..."}</li>
          <li><strong>Vitória mais elástica:</strong> ${maiorDiferenca || "Aguardando..."}</li>
          <li><strong>Média de pontos por time:</strong> ${media}</li>
        </ul>`;
      painelGrupos.appendChild(resumo);

      // listeners (1 por render)
      const btAT = document.getElementById("btn-anterior-top");
      const btPT = document.getElementById("btn-proxima-top");
      const btAB = document.getElementById("btn-anterior-bottom");
      const btPB = document.getElementById("btn-proxima-bottom");

      const go = (delta) => {
        const nova = Math.min(Math.max(numeroRodada + delta, 1), RODADA_MAXIMA);
        if (nova !== numeroRodada) atualizarRodada(nova);
      };
      btAT && btAT.addEventListener("click", () => go(-1));
      btPT && btPT.addEventListener("click", () => go(+1));
      btAB && btAB.addEventListener("click", () => go(-1));
      btPB && btPB.addEventListener("click", () => go(+1));

      [btAT, btAB].forEach(b => b && (b.disabled = numeroRodada <= 1));
      [btPT, btPB].forEach(b => b && (b.disabled = numeroRodada >= RODADA_MAXIMA));
    }

    function atualizarRodada(n) {
      renderPainelCompleto(n);
    }

    // bootstrap
    document.body.classList.add("loaded");
    atualizarRodada(rodadaAtual);
  });

})();

