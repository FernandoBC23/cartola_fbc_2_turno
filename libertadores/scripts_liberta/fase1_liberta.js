// scripts/fase1_liberta.js

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');

  // Descobre MIN/MAX das rodadas existentes no dataset
  const RODADAS_DISPONIVEIS = [...new Set(confrontosFase1.map(j => j.rodada))].sort((a,b)=>a-b);
  const RODADA_MIN     = RODADAS_DISPONIVEIS[0] ?? 1;
  const RODADA_MAXIMA  = RODADAS_DISPONIVEIS[RODADAS_DISPONIVEIS.length-1] ?? 1;

  // Para o 2º turno, force o início em 20 (ajuste se necessário)
  const RODADA_INICIO = 20;

  // Uma rodada é considerada encerrada se tiver flag 'encerrado'
  // ou se a soma dos pontos for > 0 (evita contar 0.00 como jogo encerrado)
  const rodadasEncerradas = resultadosFase1
    .filter(r => {
      const p1 = r?.mandante?.pontos;
      const p2 = r?.visitante?.pontos;
      const temPontos = (p1 != null && p2 != null && (Number(p1) + Number(p2)) > 0);
      return r?.encerrado === true || temPontos;
    })
    .map(r => r.rodada);

  // Escolha da rodada a exibir ao abrir:
  // - se houver encerradas, pega a última encerrada (ou a próxima, se preferir, some +1 e faça clamp)
  // - senão, usa RODADA_INICIO (ex.: 20)
  let rodadaAtual = rodadasEncerradas.length
    ? Math.max(...rodadasEncerradas)
    : RODADA_INICIO;

  // Garante que está dentro do intervalo do dataset
  rodadaAtual = Math.min(Math.max(rodadaAtual, RODADA_MIN), RODADA_MAXIMA);

  const painelGrupos = document.getElementById("painel-grupos");

  // Função para formatar nomes de arquivos de escudos
  const gerarNomeArquivo = nome => {
    return nome
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove acentos
      .replace(/\s+/g, "_") // troca espaços por underscore
      .replace(/[^\w\-]/g, "") // remove caracteres especiais
      .toLowerCase();
  };


  const escudosTimes = {
    "Rolo Compressor ZN": "../imagens/2_rolo_compressor_zn.png", 
    "Fedato Futebol Clube": "../imagens/2_fedato_futebol_clube.png", 
    "SUPER VASCÃO F.C": "../imagens/2_super_vascao_fc.png",
    "seralex": "../imagens/2_seralex.png",

    "lsauer fc": "../imagens/2_lsauer_fc.png", 
    "FBC Colorado": "../imagens/2_fbc_colorado.png",
    "MauHumor F.C.": "../imagens/2_mauhumor_fc.png", 
    "Analove10 ITAQUI GRANDE!!":"../imagens/2_analove10_itaqui_grande.png", 

    "Pity10": "../imagens/2_pity10.png",
    "SERGRILLO": "../imagens/2_sergrillo.png",
    "Paulo Virgili FC": "../imagens/2_paulo_virgili_fc.png",
    "Gig@ntte": "../imagens/2_gigntte.png", 

    "cartola scheuer": "../imagens/2_cartola_scheuer.png", 
    "KillerColorado": "../imagens/2_killercolorado.png",
    "pura bucha /botafogo": "../imagens/2_pura_bucha_botafogo.png", 
    "Super Vasco f.c": "../imagens/2_super_vasco_fc.png",

    "Laranjja Mecannica": "../imagens/2_laranjja_mecannica.png",   
    "Texas Club 2025": "../imagens/2_texas_club_2025.png",
    "Gremiomaniasm": "../imagens/2_gremiomaniasm.png",  
    "Dom Camillo68": "../imagens/2_dom_camillo68.png",  
    
    "FC Los Castilho": "../imagens/2_fc_los_castilho.png",
    "Noah A 10": "../imagens/2_noah_a_10.png",
    "Real SCI": "../imagens/2_real_sci.png",
    "Lá do Itaqui": "../imagens/2_la_do_itaqui.png",

    "teves_futsal20 f.c": "../imagens/2_teves_futsal20_fc.png",
    "S.E.R. GRILLO": "../imagens/2_ser_grillo.png",
    "KING LEONN": "../imagens/2_king_leonn.png", 
    "Tatols Beants F.C": "../imagens/2_tatols_beants_fc.png", 
    
    "RHANKA DENTY FC25": "../imagens/2_rhanka_denty_fc25.png",
    "A Lenda Super Vasco F.c": "../imagens/2_a_lenda_super_vasco_fc.png", 
    "TEAM LOPES 99": "../imagens/2_team_lopes_99.png",  
    "BORGES ITAQUI F.C.": "../imagens/2_borges_itaqui_fc.png"   
  };

  const clubesTimes = {
    "Rolo Compressor ZN": "CBB",
    "Fedato Futebol Clube": "EST",
    "SUPER VASCÃO F.C": "UCH",
    "seralex": "BOT",

    "lsauer fc": "BSC",
    "FBC Colorado": "IDV",
    "MauHumor F.C.": "UNI",
    "Analove10 ITAQUI GRANDE!!": "RIV",

    "Pity10": "CCO",
    "SERGRILLO": "LDU",
    "Paulo Virgili FC": "TAC",
    "Gig@ntte": "FLA", 

    "cartola scheuer": "ALI",
    "KillerColorado": "LIB", 
    "pura bucha /botafogo": "TAL",  
    "Super Vasco f.c": "SAO",

    "Laranjja Mecannica": "BUC",
    "Texas Club 2025": "COL",
    "Gremiomaniasm": "FOR",
    "Dom Camillo68": "RAC",

    "FC Los Castilho": "BAH",
    "Noah A 10": "INT",
    "Real SCI": "ATN",
    "Lá do Itaqui": "NAC",

    "teves_futsal20 f.c": "CCP",
    "S.E.R. GRILLO": "BOL",  
    "KING LEONN": "SCR",
    "Tatols Beants F.C": "PAL",

    "RHANKA DENTY FC25": "SAB",     
    "A Lenda Super Vasco F.c": "OLI",  
    "TEAM LOPES 99": "VEL",               
    "BORGES ITAQUI F.C.": "PEN"
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

  // 🔹 Se classificaçãoFase1 vier vazia, monta placeholder zerado
  let dadosClassificacao = {};
  if (Object.keys(classificacaoFase1).length === 0) {
    confrontosFase1.forEach(jogo => {
      const grupo = jogo.grupo || "Outros";
      if (!dadosClassificacao[grupo]) dadosClassificacao[grupo] = [];
      [jogo.mandante.nome, jogo.visitante.nome].forEach(nomeTime => {
        if (!dadosClassificacao[grupo].some(t => t.nome === nomeTime)) {
          dadosClassificacao[grupo].push({
            posicao: dadosClassificacao[grupo].length + 1,
            nome: nomeTime,
            pontos: 0,
            vitorias: 0,
            empates: 0,
            derrotas: 0,
            totalCartola: 0
          });
        }
      });
    });
  } else {
    dadosClassificacao = classificacaoFase1;
  }

  Object.entries(dadosClassificacao).forEach(([grupo, times]) => {
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
        <td>${(time.vitorias + time.empates + time.derrotas) || 0}</td>
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
        span.textContent = (!resultado || resultado.mandante.pontos == null || resultado.visitante.pontos == null)
          ? "🕒 Aguardando Confronto"
          : (resultado.mandante.pontos > resultado.visitante.pontos
              ? `✅ ${resultado.mandante.nome} venceu`
              : resultado.mandante.pontos < resultado.visitante.pontos
                  ? `✅ ${resultado.visitante.nome} venceu`
                  : `🤝 Empate`);

        if (!resultado) {
          span.style.backgroundColor = "#ffc107";
          span.style.color = "#000";
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

    const navegacaoRodadaGrupo = criarNavegacaoRodadaGrupo(grupo, numeroRodada);
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
      if (rodadaAtual > 20) atualizarRodada(rodadaAtual - 1);
    });
  
    const titulo = document.createElement("div");
    titulo.className = "titulo-rodada";
    titulo.textContent = `Rodada ${rodadaParaExibir}`;
  
    const btnProxima = document.createElement("button");
    btnProxima.textContent = "Próxima Rodada ▶️";
    btnProxima.addEventListener("click", () => {
      if (rodadaAtual < RODADA_MAXIMA) atualizarRodada(rodadaAtual + 1);
    });
  
    if (rodadaAtual === 20) btnAnterior.disabled = true;
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


