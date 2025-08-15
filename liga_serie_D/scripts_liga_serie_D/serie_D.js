// scripts/serie_D.js

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');

  let rodadaAtual = (() => {
    const rodadasComPontuacao = resultadosFase1
      .filter(r => r.mandante?.pontos != null && r.visitante?.pontos != null)
      .map(r => r.rodada);
    return rodadasComPontuacao.length ? Math.max(...rodadasComPontuacao) : 1;
  })();

  const RODADA_MAXIMA = 19;

  const painelGrupos = document.getElementById("painel-grupos");

  const gerarNomeArquivo = nome => {
    return nome
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_")
      .replace(/[^\w\-]/g, "")
      .toLowerCase();
  };

    const escudosTimes = {
      "FIGUEIRA DA ILHA": "../imagens/2_figueira_da_ilha.png",
      "lsauer fc": "../imagens/2_lsauer_fc.png",
      "Noah A 10": "../imagens/2_noah_a_10.png",
      "Santo Ângelo United": "../imagens/2_santo_angelo_united.png",
      "RHANKA DENTY FC25": "../imagens/2_rhanka_denty_fc25.png",
      "Texas Club 2025": "../imagens/2_texas_club_2025.png",
      "Fedato Futebol Clube": "../imagens/2_fedato_futebol_clube.png", 
      "Tabajara de Inhaua FC2": "../imagens/2_tabajara_de_inhaua_fc2.png",
      "pura bucha /botafogo": "../imagens/2_pura_bucha_botafogo.png",
      "VASCO MARTINS FC": "../imagens/2_vasco_martins_fc.png",
      "MauHumor F.C.": "../imagens/2_mauhumor_fc.png", 
      "Tatols Beants F.C": "../imagens/2_tatols_beants_fc.png",
      "TIGRE LEON": "../imagens/2_tigre_leon.png",
      "FC Los Castilho": "../imagens/2_fc_los_castilho.png",
      "A Lenda Super Vasco F.c": "../imagens/2_a_lenda_super_vasco_fc.png",  
      "FC castelo Branco 2": "../imagens/2_fc_castelo_branco_2.png",
      "seralex": "../imagens/2_seralex.png",
      "JV5 Tricolor Gaúcho": "../imagens/2_jv5_tricolor_gaucho.png",
      "pra sempre imortal fc": "../imagens/2_pra_sempre_imortal_fc.png",
      "TATITTA FC": "../imagens/2_tatitta_fc.png",    
  };

  function renderPainelCompleto(numeroRodada) {
    painelGrupos.innerHTML = "";

    const confrontosRodada = confrontosFase1.filter(j => j.rodada === numeroRodada);
    const resultadosRodada = resultadosFase1.filter(j => j.rodada === numeroRodada);

    const confrontosPorGrupo = {};
    confrontosRodada.forEach(jogo => {
      const grupo = jogo.grupo || "Outros";
      if (!confrontosPorGrupo[grupo]) confrontosPorGrupo[grupo] = [];
      confrontosPorGrupo[grupo].push(jogo);
    });

    Object.entries(classificacaoSerieA).forEach(([grupo, times]) => {
      const linha = document.createElement("div");
      linha.className = "linha-grupo";

      const colunaEsquerda = document.createElement("div");
      colunaEsquerda.className = "coluna-esquerda";

      const grupoDiv = document.createElement("div");
      grupoDiv.className = "tabela-grupo";

      const tabela = document.createElement("table");
      tabela.className = "tabela-classificacao";
      tabela.innerHTML = `
        <thead>
          <tr>
            <th>Pos.</th>
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
          <td><div class="time-info"><img src="${escudo}" class="escudo" alt="${time.nome}">${time.nome}</div></td>
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


      // 🔁 Botões de navegação (entre tabela e confrontos)
      const navegacaoRodadaTop = document.createElement("div");
      navegacaoRodadaTop.className = "rodada-container";
      navegacaoRodadaTop.innerHTML = `
        <div class="navegacao-rodada">
          <button id="btn-anterior-top">◀️ Rodada Anterior</button>
          <div class="titulo-rodada" id="titulo-rodada-top">Rodada ${numeroRodada}</div>
          <button id="btn-proxima-top">Próxima Rodada ▶️</button>
        </div>
      `;
      colunaEsquerda.appendChild(navegacaoRodadaTop);
      

      const colunaDireita = document.createElement("div");
      colunaDireita.className = "coluna-direita";
    
      if (confrontosPorGrupo[grupo]) {
        const grupoConfrontos = document.createElement("div");
        grupoConfrontos.className = "grupo-confronto";

        confrontosPorGrupo[grupo].forEach(jogo => {
          const jogoDiv = document.createElement("div");
          jogoDiv.className = "jogo";

          const escudoSrc = nome => escudosTimes[nome] || `../imagens/${gerarNomeArquivo(nome)}.png`;

          const time1 = document.createElement("div");
          time1.className = "time";
          time1.innerHTML = `<img src="${escudoSrc(jogo.mandante.nome)}" alt="${jogo.mandante.nome}">`;

          const time2 = document.createElement("div");
          time2.className = "time";
          time2.innerHTML = `<img src="${escudoSrc(jogo.visitante.nome)}" alt="${jogo.visitante.nome}">`;

          const resultado = resultadosRodada.find(r =>
            r.mandante.nome === jogo.mandante.nome &&
            r.visitante.nome === jogo.visitante.nome
          );

          const p1 = resultado?.mandante?.pontos?.toFixed(2) ?? "?";
          const p2 = resultado?.visitante?.pontos?.toFixed(2) ?? "?";

          const placar = document.createElement("div");
          placar.className = "placar";
          placar.innerHTML = `<span class="placar-numero">${p1}</span> <span class="placar-x"> X </span> <span class="placar-numero">${p2}</span>`;

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

        const separador = document.createElement("div");
        separador.className = "separador-grupo";
        grupoConfrontos.appendChild(separador);
        colunaDireita.appendChild(grupoConfrontos);
      }

      linha.appendChild(colunaEsquerda);
      linha.appendChild(colunaDireita);
      painelGrupos.appendChild(linha);
    });

    const navegacaoRodadaBottom = document.createElement("div");
    navegacaoRodadaBottom.className = "rodada-container";
    navegacaoRodadaBottom.innerHTML = `
      <div class="navegacao-rodada">
        <button id="btn-anterior-bottom">◀️ Rodada Anterior</button>
        <div class="titulo-rodada" id="titulo-rodada-bottom">Rodada ${numeroRodada}</div>
        <button id="btn-proxima-bottom">Próxima Rodada ▶️</button>
      </div>
    `;
    painelGrupos.appendChild(navegacaoRodadaBottom);



    const resumoRodada = document.createElement("div");
    resumoRodada.className = "resumo-rodada";

    let maiorPontuacao = "";
    let maiorTotal = 0;
    let maiorDiferenca = "";
    let diferencaMaxima = 0;
    let totalPontos = 0;
    let jogosValidos = 0;

    resultadosRodada.forEach(res => {
      if (res.mandante.pontos != null && res.visitante.pontos != null) {
        const total = res.mandante.pontos + res.visitante.pontos;
        const dif = Math.abs(res.mandante.pontos - res.visitante.pontos);

        if (total > maiorTotal) {
          maiorTotal = total;
          maiorPontuacao = `${res.mandante.nome} ${res.mandante.pontos.toFixed(2)} x ${res.visitante.pontos.toFixed(2)} ${res.visitante.nome}`;
        }

        if (dif > diferencaMaxima) {
          diferencaMaxima = dif;
          maiorDiferenca = `${res.mandante.nome} ${res.mandante.pontos.toFixed(2)} x ${res.visitante.pontos.toFixed(2)} ${res.visitante.nome}`;
        }

        totalPontos += res.mandante.pontos + res.visitante.pontos;
        jogosValidos++;
      }
    });

    const mediaPontos = jogosValidos > 0 ? (totalPontos / (jogosValidos * 2)).toFixed(2) : "-";

    resumoRodada.innerHTML = `
      <h3>Resumo da Rodada ${numeroRodada}</h3>
      <ul>
        <li><strong>Maior pontuação total:</li>
        <li></strong> ${maiorPontuacao || "Aguardando..."}</li>
        <li><strong>Vitória mais elástica:</li>
         <li></strong> ${maiorDiferenca || "Aguardando..."}</li>
        <li><strong>Média de pontos por time:</strong> ${mediaPontos}</li>
      </ul>
    `;

    painelGrupos.appendChild(resumoRodada);
  }

  function atualizarRodada(novaRodada) {
    rodadaAtual = novaRodada;
    renderPainelCompleto(novaRodada);

    const btnAnteriorTop = document.getElementById("btn-anterior-top");
    const btnProximaTop = document.getElementById("btn-proxima-top");
    const btnAnteriorBottom = document.getElementById("btn-anterior-bottom");
    const btnProximaBottom = document.getElementById("btn-proxima-bottom");

    btnAnteriorTop.addEventListener("click", () => {
      if (rodadaAtual > 1) atualizarRodada(rodadaAtual - 1);
    });
    btnProximaTop.addEventListener("click", () => {
      if (rodadaAtual < RODADA_MAXIMA) atualizarRodada(rodadaAtual + 1);
    });
    btnAnteriorBottom.addEventListener("click", () => {
      if (rodadaAtual > 1) atualizarRodada(rodadaAtual - 1);
    });
    btnProximaBottom.addEventListener("click", () => {
      if (rodadaAtual < RODADA_MAXIMA) atualizarRodada(rodadaAtual + 1);
    });

    document.getElementById("titulo-rodada-top").textContent = `Rodada ${rodadaAtual}`;
    document.getElementById("titulo-rodada-bottom").textContent = `Rodada ${rodadaAtual}`;

    btnAnteriorTop.disabled = rodadaAtual === 1;
    btnProximaTop.disabled = rodadaAtual === RODADA_MAXIMA;
    btnAnteriorBottom.disabled = rodadaAtual === 1;
    btnProximaBottom.disabled = rodadaAtual === RODADA_MAXIMA;
  }

  atualizarRodada(rodadaAtual);
});