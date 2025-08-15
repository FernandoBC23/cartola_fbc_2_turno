// scripts/fase_quartas_sula.js 

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');

  let rodadaAtual = (() => {
    const rodadasComPontuacao = resultados_final_sula
      .filter(r => r.mandante?.pontos != null && r.visitante?.pontos != null)
      .map(r => r.rodada);
    return rodadasComPontuacao.length ? Math.max(...rodadasComPontuacao) : 19;
  })();
  
  const RODADA_MAXIMA = 19;

  const painelGrupos = document.getElementById("painel-sula-final");

  const gerarNomeArquivo = nome => {
    return nome
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_")
      .replace(/[^\w\-]/g, "")
      .toLowerCase();
  };


  const escudosTimes = {
    "Dom Camillo68": "../imagens/2_dom_camillo68.png",  
    "lsauer fc": "../imagens/2_lsauer_fc.png", 
    "Tabajara de Inhaua FC2": "../imagens/2_tabajara_de_inhaua_fc2.png",
    "TEAM LOPES 99": "../imagens/2_team_lopes_99.png",
    "KING LEONN": "../imagens/2_king_leonn.png",
    "Laranjja Mecannica": "../imagens/2_laranjja_mecannica.png",
    "Gremiomaniasm": "../imagens/2_gremiomaniasm.png",  
    "Gig@ntte": "../imagens/2_gigntte.png", 
    "BORGES ITAQUI F.C.": "../imagens/2_borges_itaqui_fc.png",
    "Tatols Beants F.C": "../imagens/2_tatols_beants_fc.png",
    "Grêmio imortal 37": "../imagens/2_gremio_imortal_37.png",
    "MauHumor F.C.": "../imagens/2_mauhumor_fc.png",
    "F.C. Rei Das Copas": "../imagens/2_fc_rei_das_copas.png",
    "HS SPORTS F.C": "../imagens/2_hs_sports_fc.png",
    "FC Los Castilho": "../imagens/2_fc_los_castilho.png",
    "E.C. Bororé": "../imagens/2_ec_borore.png"
  };

  const clubesTimes = {
    "Dom Camillo68": "UCH",   
    "lsauer fc": "BSC",
    "BORGES ITAQUI F.C.": "EST",
    "Tatols Beants F.C": "TAL",
    "Grêmio imortal 37": "TAC",
    "MauHumor F.C.": "OLI",
    "F.C. Rei Das Copas": "CCP",
    "HS SPORTS F.C": "RIV",
    "FC Los Castilho": "NAC",
    "E.C. Bororé": "FOR",
    "Tabajara de Inhaua FC2": "IDV",
    "TEAM LOPES 99": "FLA",
    "KING LEONN": "PAL",
    "Laranjja Mecannica": "PEN",     
    "Gremiomaniasm": "ATL",
    "Gig@ntte": "SAB"
  }; 


  function renderPainelCompleto(numeroRodada) {
    painelGrupos.innerHTML = "";

    const confrontosRodada = confrontos_final_sula.filter(j => j.rodada === numeroRodada);
    const resultadosRodada = resultados_final_sula.filter(j => j.rodada === numeroRodada);

    const confrontosPorGrupo = {};
    confrontosRodada.forEach(jogo => {
    const grupo = jogo.jogo || "Outros";  
    if (!confrontosPorGrupo[grupo]) confrontosPorGrupo[grupo] = [];
    confrontosPorGrupo[grupo].push(jogo);
    });

    Object.entries(classificacao_final_sula).forEach(([grupo, times]) => {
      const linha = document.createElement("div");
      linha.className = "linha-grupo";

      const colunaEsquerda = document.createElement("div");
      colunaEsquerda.className = "coluna-esquerda";

      const grupoDiv = document.createElement("div");
      grupoDiv.className = "tabela-grupo";

      const titulo = document.createElement("div");
      titulo.className = "titulo-grupo";
      titulo.textContent = grupo;
      grupoDiv.appendChild(titulo);   

      const tabela = document.createElement("table");
      tabela.className = "tabela-classificacao";
      tabela.innerHTML = `
        <thead>
          <tr>
            <th>Pos</th>
            <th>Time</th>
            <th>Pts</th>
            <th>J</th>
            <th>V</th>
            <th>E</th>
            <th>D</th>
            <th>Total</th>           
          </tr>
        </thead>
      `;
      const tbody = document.createElement("tbody");

      times.forEach((time, index) => {
        const tr = document.createElement("tr");
        if (index === 0 || index === 1) tr.classList.add("lider-grupo");

        const escudo = escudosTimes[time.nome] || "../imagens/escudo_padrao.png";
        tr.innerHTML = `
          <td>${time.posicao}</td>
          <td>
            <div class="time-info">
              <img src="${escudo}" class="escudo" alt="${time.nome}">
              <span class="tag-clube">${clubesTimes[time.nome] ?? ""}</span>
              ${time.nome}              
            </div>
          </td>
          <td>${time.pontos}</td>
          <td>${time.vitorias + time.empates + time.derrotas}</td>
          <td>${time.vitorias}</td>
          <td>${time.empates}</td>
          <td>${time.derrotas}</td>
          <td>${time.totalCartola.toFixed(2)}</td>          
        `;
        tbody.appendChild(tr);
      });

      tabela.appendChild(tbody);
      grupoDiv.appendChild(tabela);
      colunaEsquerda.appendChild(grupoDiv);

      const colunaDireita = document.createElement("div");
      colunaDireita.className = "coluna-direita";

      if (confrontosPorGrupo[grupo]) {
        const grupoConfrontos = document.createElement("div");
        grupoConfrontos.className = "grupo-confronto";

        confrontosPorGrupo[grupo].forEach(jogo => {
          const jogoDiv = document.createElement("div");
          jogoDiv.className = "jogo";

          const escudoSrc = nome => `../imagens/2_${gerarNomeArquivo(nome)}.png`;

          const time1 = document.createElement("div");
          time1.className = "time";          
          time1.innerHTML = `
            <img src="${escudoSrc(jogo.mandante.nome)}" alt="${jogo.mandante.nome}">
            <span class="tag-escudo">${clubesTimes[jogo.mandante.nome] ?? ""}</span>
          `;

          const time2 = document.createElement("div");
          time2.className = "time";          
          time2.innerHTML = `
            <span class="tag-escudo">${clubesTimes[jogo.visitante.nome] ?? ""}</span>
            <img src="${escudoSrc(jogo.visitante.nome)}" alt="${jogo.visitante.nome}">            
          `;

          const resultado = resultadosRodada.find(r =>
            r.mandante.nome === jogo.mandante.nome &&
            r.visitante.nome === jogo.visitante.nome
          );

          const p1 = resultado?.mandante?.pontos?.toFixed(2) ?? "?";
          const p2 = resultado?.visitante?.pontos?.toFixed(2) ?? "?";

          // const placar = document.createElement("div");
          // placar.className = "placar";
          // placar.textContent = `${p1} × ${p2}`;

          const placar = document.createElement("div");
          placar.className = "placar";
          placar.innerHTML = `
            <span class="placar-numero">${p1}</span> 
            <span class="placar-x"> X </span> 
            <span class="placar-numero">${p2}</span>
          `;          

          const resultadoDiv = document.createElement("div");
          resultadoDiv.className = "resultado";
          const span = document.createElement("span");
          span.className = "vencedor";

          if (!resultado || resultado.mandante.pontos == null || resultado.visitante.pontos == null) {
            span.textContent = "🕒 Aguardando Confronto";
            span.style.backgroundColor = "#ffc107";
            span.style.color = "#000";
          } else if (resultado.mandante.pontos > resultado.visitante.pontos) {
            span.textContent = `✅ ${resultado.mandante.nome} venceu`;
          } else if (resultado.mandante.pontos < resultado.visitante.pontos) {
            span.textContent = `✅ ${resultado.visitante.nome} venceu`;
          } else {
            span.textContent = `🤝 Empate`;
          }

          jogoDiv.appendChild(time1);
          jogoDiv.appendChild(placar);
          jogoDiv.appendChild(time2);
          resultadoDiv.appendChild(span);

          grupoConfrontos.appendChild(jogoDiv);
          grupoConfrontos.appendChild(resultadoDiv);
        });

        // 🔽 Adiciona separador após os confrontos do grupo
        const separador = document.createElement("div");
        separador.className = "separador-grupo";
        grupoConfrontos.appendChild(separador);

        colunaDireita.appendChild(grupoConfrontos);
      }

      const navegacaoRodadaGrupo = criarNavegacaoRodadaGrupo(grupo, numeroRodada);
      console.log("Adicionando navegação para grupo:", grupo);

      colunaDireita.appendChild(navegacaoRodadaGrupo);


      linha.appendChild(colunaEsquerda);
      linha.appendChild(colunaDireita);
      painelGrupos.appendChild(linha);
    });
  }

  function atualizarRodada(novaRodada) {
    rodadaAtual = novaRodada;
    renderPainelCompleto(novaRodada);
  }
  
  function criarNavegacaoRodadaGrupo(grupo, rodadaParaExibir) {
    const container = document.createElement("div");
    container.className = "rodada-container";
  
    const navegacao = document.createElement("div");
    navegacao.className = "navegacao-rodada";
  
    const btnAnterior = document.createElement("button");
    btnAnterior.textContent = "◀️ Rodada Anterior";
    btnAnterior.addEventListener("click", () => {
      if (rodadaAtual > 19) atualizarRodada(rodadaAtual - 1);
    });
  
    const titulo = document.createElement("div");
    titulo.className = "titulo-rodada";
    titulo.textContent = `Rodada ${rodadaParaExibir}`;
  
    const btnProxima = document.createElement("button");
    btnProxima.textContent = "Próxima Rodada ▶️";
    btnProxima.addEventListener("click", () => {
      if (rodadaAtual < RODADA_MAXIMA) atualizarRodada(rodadaAtual + 1);
    });
  
    if (rodadaAtual === 19) btnAnterior.disabled = true;
    if (rodadaAtual === RODADA_MAXIMA) btnProxima.disabled = true;
  
    navegacao.appendChild(btnAnterior);
    navegacao.appendChild(titulo);
    navegacao.appendChild(btnProxima);
  
    container.appendChild(navegacao);
    return container;
  }
  
  // inicia com a rodada atual
  atualizarRodada(rodadaAtual);
  
});


