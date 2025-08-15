// // liga_eliminacao.js

// let rodadaAtual = (() => {
//   const rodadasComPontuacao = Object.values(pontuacoesPorRodada)
//     .flatMap(p => Object.entries(p)
//       .filter(([_, pontos]) => typeof pontos === "number")
//       .map(([rodada]) => parseInt(rodada.replace("Rodada ", ""), 10))
//     );

//   return rodadasComPontuacao.length ? Math.max(...rodadasComPontuacao) : 1;
// })();
// let totalRodadas = 1;



// document.addEventListener("DOMContentLoaded", () => {
//   const rodadasValidas = Object.values(pontuacoesPorRodada)[0];
//   totalRodadas = rodadasValidas ? Object.keys(rodadasValidas).length : 1;

//   // Topo
//   const tituloRodadaTop = document.getElementById("titulo-rodada");
//   const btnAnteriorTop = document.getElementById("btn-anterior");
//   const btnProximaTop = document.getElementById("btn-proxima");

//   // Rodapé
//   const tituloRodadaBottom = document.getElementById("titulo-rodada-bottom");
//   const btnAnteriorBottom = document.getElementById("btn-anterior-bottom");
//   const btnProximaBottom = document.getElementById("btn-proxima-bottom");
  

//   // Atualiza UI com rodada atual
//   function atualizarRodada(novaRodada) {
//     rodadaAtual = novaRodada; // 👈 isso precisa estar aqui
//     exibirPontuacoesRodada(rodadaAtual);
//     exibirUltimoColocadoRodada(rodadaAtual);
//     exibirResumoEliminacao(rodadaAtual);

//     if (tituloRodadaTop) tituloRodadaTop.textContent = `Rodada ${rodadaAtual}`;
//     if (tituloRodadaBottom) tituloRodadaBottom.textContent = `Rodada ${rodadaAtual}`;

//     const desabilitarAnterior = rodadaAtual <= 20;
//     const desabilitarProxima = rodadaAtual >= totalRodadas;

//     if (btnAnteriorTop) btnAnteriorTop.disabled = desabilitarAnterior;
//     if (btnProximaTop) btnProximaTop.disabled = desabilitarProxima;
//     if (btnAnteriorBottom) btnAnteriorBottom.disabled = desabilitarAnterior;
//     if (btnProximaBottom) btnProximaBottom.disabled = desabilitarProxima;
//   }


//   // Ações dos botões
//   const configurarBotao = (botao, direcao) => {
//     if (botao) {
//       botao.addEventListener("click", () => {
//         const novaRodada = rodadaAtual + direcao;
//         if (novaRodada >= 1 && novaRodada <= totalRodadas) {
//           atualizarRodada(novaRodada);
//         }
//       });
//     }
//   };

//   configurarBotao(btnAnteriorTop, -1);
//   configurarBotao(btnProximaTop, +1);
//   configurarBotao(btnAnteriorBottom, -1);
//   configurarBotao(btnProximaBottom, +1);

//   atualizarRodada(rodadaAtual);
// });


// // DICIONÁRIO DOS ESCUDOS (ajuste nomes se necessário)
// const escudosTimes = {
//   "KING LEONN": "../imagens/2_king_leonn.png",
//   "Fedato Futebol Clube": "../imagens/2_fedato_futebol_clube.png",
//   "BORGES CLIMA FUT F.C": "../imagens/2_borges_itaqui_fc.png",
//   "OlhaEleAiF.C!": "../imagens/2_olhaeleaifc.png",
//   "Analove10 ITAQUI GRANDE!!": "../imagens/2_analove10_itaqui_grande.png",
//   "Gremiomaniasm": "../imagens/2_gremiomaniasm.png",
//   "Pity10": "../imagens/2_pity10.png",
//   "E.C. Bororé": "../imagens/2_ec_borore.png",
//   "PUXE FC": "../imagens/2_puxe_fc.png",
//   "Super Vasco f.c": "../imagens/2_super_vasco_fc.png",
//   "Texas Club 2025": "../imagens/2_texas_club_2025.png",
//   "lsauer fc": "../imagens/2_lsauer_fc.png",
//   "Grêmio imortal 37": "../imagens/2_gremio_imortal_37.png",
//   "mercearia Estrela ": "../imagens/2_mercearia_estrela.png",
//   "pura bucha /botafogo": "../imagens/2_pura_bucha_botafogo.png",
//   "seralex": "../imagens/2_seralex.png",
//   "HS SPORTS F.C": "../imagens/2_hs_sports_fc.png",
//   "Dom Camillo68": "../imagens/2_dom_camillo68.png",
//   "Tatols Beants F.C": "../imagens/2_tatols_beants_fc.png",
//   "TEAM LOPES 99": "../imagens/2_team_lopes_99.png",
//   "MAFRA MARTINS FC": "../imagens/2_mafra_martins_fc.png",  
//   "Tabajara de Inhaua FC2": "../imagens/2_tabajara_de_inhaua_fc2.png",
//   "FIGUEIRA DA ILHA": "../imagens/2_figueira_da_ilha.png",
//   "SERGRILLO": "../imagens/2_sergrillo.png",
//   "S.E.R. GRILLO": "../imagens/2_ser_grillo.png",
//   "Gig@ntte": "../imagens/2_gigntte.png",
//   "KP JUV.": "../imagens/2_kp_juv.png",
//   "O clube do povo Itaqui/Rss": "../imagens/2_o_clube_do_povo_itaqui_rss.png",
//   "I.B.CASTILHO FC": "../imagens/2_i_b_castilho_fc.png",
//   "FBC Colorado": "../imagens/2_fbc_colorado.png",
//   "VASCO MARTINS FC": "../imagens/2_vasco_martins_fc.png",
//   "A Lenda Super Vasco F.c ": "../imagens/2_a_lenda_super_vasco_fc.png",
// };

// function configurarBotoesNavegacao(totalRodadas) {
//   document.getElementById("btn-anterior").addEventListener("click", () => {
//     if (rodadaAtual > 20) {
//       rodadaAtual--;
//       atualizarRodada();
//     }
//   });

//   document.getElementById("btn-proxima").addEventListener("click", () => {
//     if (rodadaAtual < totalRodadas) {
//       rodadaAtual++;
//       atualizarRodada();
//     }
//   });
// }

// function atualizarRodada() {
//   exibirPontuacoesRodada(rodadaAtual);
//   exibirUltimoColocadoRodada(rodadaAtual);
//   exibirResumoEliminacao(rodadaAtual);

//   const titulo = document.getElementById("titulo-rodada");
//   if (titulo) {
//     titulo.textContent = `Rodada ${rodadaAtual}`;
//   }
// }


// function exibirPontuacoesRodada(rodada) {
//   const tbody = document.getElementById("classificacao-corpo");
//   if (!tbody) return;

//   tbody.innerHTML = "";
//   const lista = [];

//   for (const time in pontuacoesPorRodada) {
//     const pontos = pontuacoesPorRodada[time][`Rodada ${rodada}`];
//     if (typeof pontos === "number") {
//       lista.push({ time, pontos });
//     }
//   }

//   // Ordena por pontuação (do maior para o menor)
//   lista.sort((a, b) => b.pontos - a.pontos);

//   // Identifica os eliminados da rodada
//   let eliminadosRodada = [];
//   if (rodada >= 20 && rodada <= 28) {
//     const menorPontuacao = lista[lista.length - 1]?.pontos;
//     eliminadosRodada = lista.filter(item => item.pontos === menorPontuacao).map(item => item.time).slice(0, 1);
//   } else if (rodada >= 29 && rodada <= 37) {
//     const menor1 = lista[lista.length - 1]?.pontos;
//     const menor2 = lista[lista.length - 2]?.pontos;
//     eliminadosRodada = lista
//       .filter(item => item.pontos === menor1 || item.pontos === menor2)
//       .map(item => item.time)
//       .slice(0, 2);
//   } else {
//     eliminadosRodada = []; // Rodada 38 = final
//   }

//   // Monta a tabela
//   lista.forEach((item, index) => {
//     const escudo = escudosTimes[item.time] || "../imagens/default.png";
//     const isEliminado = eliminadosRodada.includes(item.time);

//     const row = document.createElement("tr");
//     row.innerHTML = `
//       <td>${index + 1}</td>
//       <td>
//         <div class="time-info">
//           <img src="${escudo}" class="escudo" alt="${item.time}" />
//           ${item.time}
//           ${isEliminado ? '<span class="eliminado-tag">Eliminado</span>' : ''}
//         </div>
//       </td>
//       <td>${item.pontos.toFixed(2)}</td>
//     `;

//     if (isEliminado) {
//       row.classList.add("eliminado-atual");
//     }

//     tbody.appendChild(row);
//   });
// }


// // function exibirUltimoColocadoRodada(rodadaAtual) {
// //   const avisoContainer = document.getElementById("aviso-eliminado");
// //   if (!avisoContainer) return;

// //   const pontuacoesRodada = [];

// //   for (const time in pontuacoesPorRodada) {
// //     const pontos = pontuacoesPorRodada[time][`Rodada ${rodadaAtual}`];
// //     if (typeof pontos === "number") {
// //       pontuacoesRodada.push({ time, pontos });
// //     }
// //   }

// //   if (pontuacoesRodada.length === 0) {
// //     avisoContainer.innerHTML = "";
// //     return;
// //   }

// //   pontuacoesRodada.sort((a, b) => a.pontos - b.pontos);
// //   const ultimo = pontuacoesRodada[0];

// //   avisoContainer.innerHTML = `
// //     ❌ <strong>Último colocado da Rodada ${rodadaAtual}:</strong> ${ultimo.time} com ${ultimo.pontos.toFixed(2)} pontos. (Eliminado)
// //   `;
// // }

// function exibirUltimoColocadoRodada(rodadaAtual) {
//   const avisoContainer = document.getElementById("aviso-eliminado");
//   if (!avisoContainer) return;

//   const pontuacoesRodada = [];

//   for (const time in pontuacoesPorRodada) {
//     const pontos = pontuacoesPorRodada[time][`Rodada ${rodadaAtual}`];
//     if (typeof pontos === "number") {
//       pontuacoesRodada.push({ time, pontos });
//     }
//   }

//   if (pontuacoesRodada.length === 0) {
//     avisoContainer.innerHTML = "";
//     return;
//   }

//   pontuacoesRodada.sort((a, b) => a.pontos - b.pontos);

//   // Rodadas 1–9: elimina 1; Rodadas 10–18: elimina 2; Rodada 19: final
//   if (rodadaAtual <= 9) {
//     const eliminado = pontuacoesRodada[0];
//     avisoContainer.innerHTML = `
//       ❌ <strong>Último colocado da Rodada ${rodadaAtual}:</strong> ${eliminado.time} com ${eliminado.pontos.toFixed(2)} pontos. (Eliminado)
//     `;
//   } else if (rodadaAtual <= 18) {
//     const elim1 = pontuacoesRodada[0];
//     const elim2 = pontuacoesRodada[1];
//     avisoContainer.innerHTML = `
//       ❌ <strong>Dois últimos colocados da Rodada ${rodadaAtual}:</strong><br>
//       ${elim1.time} com ${elim1.pontos.toFixed(2)} pts<br>
//       ${elim2.time} com ${elim2.pontos.toFixed(2)} pts<br>
//       (Ambos Eliminados)
//     `;
//   } else {
//     avisoContainer.innerHTML = `🏆 <strong>Rodada Final:</strong> Sem eliminações — disputa entre os 5 melhores.`;
//   }
// }



// function exibirResumoEliminacao(rodadaAtual) {
//   const container = document.getElementById("resumo-eliminacao");
//   if (!container) return;

//   const rodadaChave = `Rodada ${rodadaAtual}`;

//   // 📊 Estatísticas da rodada
//   const pontuacoesRodada = [];
//   for (const time in pontuacoesPorRodada) {
//     const pontos = pontuacoesPorRodada[time][rodadaChave];
//     if (typeof pontos === "number") {
//       pontuacoesRodada.push({ time, pontos });
//     }
//   }

//   let estatisticasHTML = "";
//   if (pontuacoesRodada.length > 0) {
//     pontuacoesRodada.sort((a, b) => b.pontos - a.pontos);
//     const maior = pontuacoesRodada[0];
//     const menor = pontuacoesRodada[pontuacoesRodada.length - 1];
//     const total = pontuacoesRodada.reduce((sum, obj) => sum + obj.pontos, 0);
//     const media = (total / pontuacoesRodada.length).toFixed(2);

//     estatisticasHTML = `
//       <h3>📊 Resumo da Rodada ${rodadaAtual}</h3>
//       <ul>
//         <li><strong>✅ Maior pontuação:</strong> ${maior.time} com ${maior.pontos.toFixed(2)} pts</li>
//         <li><strong>❌ Menor pontuação:</strong> ${menor.time} com ${menor.pontos.toFixed(2)} pts</li>
//         <li><strong>📊 Média geral:</strong> ${media} pts</li>
//       </ul>
//     `;
//   }

//   // 🔥 Eliminações acumuladas
//   let eliminacoesHTML = `<h3>🔥 Eliminações</h3><ul>`;
  
//   for (let i = 1; i <= rodadaAtual; i++) {
//     const chaveRodada = `Rodada ${i}`;
//     const pontuacoes = [];

//     for (const time in pontuacoesPorRodada) {
//       const pontos = pontuacoesPorRodada[time][chaveRodada];
//       if (typeof pontos === "number") {
//         pontuacoes.push({ time, pontos });
//       }
//     }

//     if (pontuacoes.length === 0) continue;

//     pontuacoes.sort((a, b) => a.pontos - b.pontos); // menores primeiro

//     if (i <= 9) {
//       const eliminado = pontuacoes[0].time;
//       eliminacoesHTML += `<li>❌ <strong>Rodada ${i}:</strong> ${eliminado}</li>`;
//     } else if (i <= 18) {
//       const elim1 = pontuacoes[0].time;
//       const elim2 = pontuacoes[1]?.time;
//       eliminacoesHTML += `<li>❌ <strong>Rodada ${i}:</strong> ${elim1} e ${elim2}</li>`;
//     } else {
//       eliminacoesHTML += `<li>🏆 <strong>Rodada ${i}:</strong> Final entre os 5 melhores (sem eliminação)</li>`;
//     }
//   }

//   eliminacoesHTML += `</ul>`;
//   container.innerHTML = `${estatisticasHTML}${eliminacoesHTML}`;
// }






// ###########################################################################################################################
// liga_eliminacao.js — 2º TURNO (Rodadas 20–38) com placeholders

// =======================
// Janela do 2º turno
// =======================
const RODADA_INICIO = 20;
const RODADA_FIM    = 38;

// =======================
// Utilitários
// =======================
function gerarNomeArquivo(nome) {
  return (nome || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^\w\-]/g, "")
    .toLowerCase();
}

// Lista fixa de participantes (se não quiser usar <script> no HTML)
const PARTICIPANTES_FIXOS = [
    "seralex",
    "Analove10 ITAQUI GRANDE!!",
    "Dom Camillo68",
    "Tatols Beants F.C",
    "OlhaEleAiF.C!",
    "Fedato Futebol Clube",
    "Texas Club 2025",
    "FBC Colorado",
    "pura bucha /botafogo",
    "S.E.R. GRILLO",
    "Lá do Itaqui",
    "HS SPORTS F.C",
    "FC Los Castilho ",
    "A Lenda Super Vasco F.c ",
    "Super Vasco f.c",
    "MAFRA MARTINS FC",
    "VASCO MARTINS FC",
    // "KING LEONN",
    "Rolo Compressor  ZN",
    "KP JUV.",
    "PUXE FC",
    "TORRESMO COM PINGA  ",
    "Gremiomaniasm",
    "Noah A 10",
    "MauHumor F.C.",
    "Pity10",
    "lsauer fc",
    "cartola scheuer",
    "Paulo Virgili FC",
    "FIGUEIRA DA ILHA",
    "teves_futsal20 f.c",
    "C.A. Charru@",
    "JV5 Tricolor Gaúcho"
];


// Lista de participantes (tenta várias fontes)
function getListaTimes() {
  // 1) lista vinda do HTML (se existir)
  if (Array.isArray(window.participantesLiga) && window.participantesLiga.length) {
    return [...new Set(window.participantesLiga)].sort((a, b) => a.localeCompare(b));
  }
  // 2) lista fixa aqui no JS
  if (Array.isArray(PARTICIPANTES_FIXOS) && PARTICIPANTES_FIXOS.length) {
    return [...new Set(PARTICIPANTES_FIXOS)].sort((a, b) => a.localeCompare(b));
  }
  // 3) chaves do dataset de pontuações
  if (window.pontuacoesPorRodada && Object.keys(window.pontuacoesPorRodada).length) {
    return Object.keys(window.pontuacoesPorRodada).sort((a, b) => a.localeCompare(b));
  }
  // 4) fallback: chaves do mapa de escudos
  if (window.escudosTimes && Object.keys(window.escudosTimes).length) {
    return Object.keys(window.escudosTimes).sort((a, b) => a.localeCompare(b));
  }
  return [];
}

// Rodadas presentes no dataset (se não houver, usa 20..38 mesmo assim)
function getRodadasDisponiveis() {
  const exemplo = (window.pontuacoesPorRodada && Object.values(window.pontuacoesPorRodada)[0]) || {};
  const aPartirDoDataset = Object.keys(exemplo || {})
    .map(k => parseInt(k.replace("Rodada ", ""), 10))
    .filter(n => !Number.isNaN(n) && n >= RODADA_INICIO && n <= RODADA_FIM)
    .sort((a, b) => a - b);

  if (aPartirDoDataset.length) return aPartirDoDataset;

  // fallback: assume todas as rodadas do 2º turno
  const todas = [];
  for (let i = RODADA_INICIO; i <= RODADA_FIM; i++) todas.push(i);
  return todas;
}

// Considera rodada “concluída” se ALGUM time tiver pontuação > 0
function rodadaConcluida(n) {
  const valores = Object.values(window.pontuacoesPorRodada || {})
    .map(p => p?.[`Rodada ${n}`])
    .filter(v => typeof v === "number");
  return valores.length > 0 && valores.some(v => v > 0);
}

// =======================
// DICIONÁRIO DOS ESCUDOS (ajuste nomes se necessário)
const escudosTimes = window.escudosTimes ?? {
  "A Lenda Super Vasco F.c ": "../imagens/2_a_lenda_super_vasco_fc.png",
  "Analove10 ITAQUI GRANDE!!": "../imagens/2_analove10_itaqui_grande.png",
  "C.A. Charru@": "../imagens/2_c_a_charrua.png",
  "cartola scheuer":"../imagens/2_cartola_scheuer.png",
  "Dom Camillo68": "../imagens/2_dom_camillo68.png",
  "FBC Colorado": "../imagens/2_fbc_colorado.png",
  "FC Los Castilho ": "../imagens/2_fc_los_castilho.png",
  "Fedato Futebol Clube": "../imagens/2_fedato_futebol_clube.png",
  "FIGUEIRA DA ILHA": "../imagens/2_figueira_da_ilha.png",
  "Gremiomaniasm": "../imagens/2_gremiomaniasm.png",
  "HS SPORTS F.C": "../imagens/2_hs_sports_fc.png",  
  // "KING LEONN": "../imagens/2_king_leonn.png",
  "KP JUV.": "../imagens/2_kp_juv.png",
  "Lá do Itaqui": "../imagens/2_la_do_itaqui.png",
  "lsauer fc": "../imagens/2_lsauer_fc.png",
  "MAFRA MARTINS FC": "../imagens/2_mafra_martins_fc.png",
  "MauHumor F.C.": "../imagens/2_mauhumor_fc.png",
  "Noah A 10": "../imagens/2_noah_a_10.png",
  "OlhaEleAiF.C!": "../imagens/2_olhaeleaifc.png",
  "Paulo Virgili FC": "../imagens/2_paulo_virgili_fc.png",
  "Pity10": "../imagens/2_pity10.png",
  "pura bucha /botafogo": "../imagens/2_pura_bucha_botafogo.png",
  "PUXE FC": "../imagens/2_puxe_fc.png",
  "Rolo Compressor  ZN": "../imagens/2_rolo_compressor_zn.png",
  "S.E.R. GRILLO": "../imagens/2_ser_grillo.png",
  "seralex": "../imagens/2_seralex.png",
  "Super Vasco f.c": "../imagens/2_super_vasco_fc.png",
  "Tatols Beants F.C": "../imagens/2_tatols_beants_fc.png",
  "teves_futsal20 f.c": "../imagens/2_teves_futsal20_fc.png",
  "Texas Club 2025": "../imagens/2_texas_club_2025.png",
  "TORRESMO COM PINGA  ": "../imagens/2_torresmo_com_pinga.png",
  "VASCO MARTINS FC": "../imagens/2_vasco_martins_fc.png",
  "JV5 Tricolor Gaúcho": "../imagens/2_jv5_tricolor_gaucho.png"
};

// =======================
// Estado inicial (seguro para 2º turno)
const RODADAS_DISP = getRodadasDisponiveis();
const RODADA_MIN   = RODADAS_DISP[0] ?? RODADA_INICIO;
const RODADA_MAX   = RODADAS_DISP[RODADAS_DISP.length - 1] ?? RODADA_FIM;

let rodadaAtual = (() => {
  const encerradas = RODADAS_DISP.filter(rodadaConcluida);
  // se ninguém concluiu, começar na 20 (RODADA_INICIO)
  return encerradas.length ? Math.max(...encerradas) : RODADA_INICIO;
})();

// =======================
// Bootstrap e navegação
document.addEventListener("DOMContentLoaded", () => {
  const tituloRodadaTop     = document.getElementById("titulo-rodada");
  const btnAnteriorTop      = document.getElementById("btn-anterior");
  const btnProximaTop       = document.getElementById("btn-proxima");

  const tituloRodadaBottom  = document.getElementById("titulo-rodada-bottom");
  const btnAnteriorBottom   = document.getElementById("btn-anterior-bottom");
  const btnProximaBottom    = document.getElementById("btn-proxima-bottom");

  function clamp(n) { return Math.min(Math.max(n, RODADA_MIN), RODADA_MAX); }

  function atualizarRodada(novaRodada) {
    rodadaAtual = clamp(novaRodada);

    exibirPontuacoesRodada(rodadaAtual);
    exibirUltimoColocadoRodada(rodadaAtual);
    exibirResumoEliminacao(rodadaAtual);

    if (tituloRodadaTop)    tituloRodadaTop.textContent    = `Rodada ${rodadaAtual}`;
    if (tituloRodadaBottom) tituloRodadaBottom.textContent = `Rodada ${rodadaAtual}`;

    const desabilitarAnterior = rodadaAtual <= RODADA_MIN;
    const desabilitarProxima  = rodadaAtual >= RODADA_MAX;

    if (btnAnteriorTop)    btnAnteriorTop.disabled    = desabilitarAnterior;
    if (btnProximaTop)     btnProximaTop.disabled     = desabilitarProxima;
    if (btnAnteriorBottom) btnAnteriorBottom.disabled = desabilitarAnterior;
    if (btnProximaBottom)  btnProximaBottom.disabled  = desabilitarProxima;
  }

  const ligar = (btn, dir) => btn && btn.addEventListener("click", () => atualizarRodada(rodadaAtual + dir));
  ligar(btnAnteriorTop, -1);  ligar(btnProximaTop, +1);
  ligar(btnAnteriorBottom, -1); ligar(btnProximaBottom, +1);

  atualizarRodada(rodadaAtual); // começa certo: 20 se nada concluiu
});

// =======================
// Tabela principal (sempre listar todos os times; 0.00 se não houver dado)
function exibirPontuacoesRodada(rodada) {
  const tbody = document.getElementById("classificacao-corpo");
  if (!tbody) return;

  tbody.innerHTML = "";

  const times = getListaTimes(); // <- não depende de existir pontuação
  if (!times.length) {
    // evita visual vazio sem explicação
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="3" style="text-align:center; opacity:.8;">Sem participantes carregados.</td>`;
    tbody.appendChild(tr);
    return;
  }

  // monta lista com pontos (0 quando ausente)
  const lista = times.map(time => {
    const v = window.pontuacoesPorRodada?.[time]?.[`Rodada ${rodada}`];
    const temDado = typeof v === "number";
    return { time, pontos: temDado ? Number(v) : 0, temDado };
  });

  // ordenar por pontos desc; em empate (ou todos 0), ordem alfabética
  lista.sort((a, b) => (b.pontos - a.pontos) || a.time.localeCompare(b.time));

  // detectar “sem dados reais”
  const rodadaSemDados = !lista.some(x => x.temDado) || lista.every(x => x.pontos === 0);

  // eliminações — só com dados reais
  let eliminadosRodada = [];
  if (!rodadaSemDados) {
    if (rodada >= 20 && rodada <= 28) {
      const menor = lista[lista.length - 1]?.pontos;
      eliminadosRodada = lista.filter(x => x.pontos === menor).map(x => x.time).slice(0, 1);
    } else if (rodada >= 29 && rodada <= 37) {
      const menor1 = lista[lista.length - 1]?.pontos;
      const menor2 = lista[lista.length - 2]?.pontos;
      eliminadosRodada = lista
        .filter(x => x.pontos === menor1 || x.pontos === menor2)
        .map(x => x.time)
        .slice(0, 2);
    }
  }

  // linhas
  lista.forEach((item, idx) => {
    const esc = escudosTimes[item.time] || `./imagens/2_${gerarNomeArquivo(item.time)}.png`;
    const eliminado = !rodadaSemDados && eliminadosRodada.includes(item.time);

    const tr = document.createElement("tr");
    if (eliminado) tr.classList.add("eliminado-atual");
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>
        <div class="time-info">
          <img src="${esc}" class="escudo" alt="${item.time}" />
          ${item.time}
          ${eliminado ? '<span class="eliminado-tag">Eliminado</span>' : ''}
        </div>
      </td>
      <td>${item.pontos.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  });
}

// =======================
// Aviso de eliminado(s) da rodada (com “aguardando” quando tudo é 0)
function exibirUltimoColocadoRodada(rodada) {
  const aviso = document.getElementById("aviso-eliminado");
  if (!aviso) return;

  const times = getListaTimes();
  const arr = times.map(t => {
    const v = window.pontuacoesPorRodada?.[t]?.[`Rodada ${rodada}`];
    return (typeof v === "number") ? { time: t, pontos: Number(v) } : { time: t, pontos: 0, _semDado: true };
  });

  const temReal = arr.some(x => !x._semDado && x.pontos !== 0);
  if (!temReal) {
    aviso.innerHTML = `🕒 Aguardando pontuações da Rodada ${rodada}.`;
    return;
  }

  const ordenado = arr.slice().sort((a, b) => a.pontos - b.pontos);
  if (rodada >= 20 && rodada <= 28) {
    const elim = ordenado[0];
    aviso.innerHTML = `❌ <strong>Último colocado da Rodada ${rodada}:</strong> ${elim.time} com ${elim.pontos.toFixed(2)} pts (Eliminado)`;
  } else if (rodada >= 29 && rodada <= 37) {
    const e1 = ordenado[0], e2 = ordenado[1];
    aviso.innerHTML = `❌ <strong>Dois últimos da Rodada ${rodada}:</strong><br>${e1.time} (${e1.pontos.toFixed(2)} pts) e ${e2.time} (${e2.pontos.toFixed(2)} pts) — Eliminados`;
  } else {
    aviso.innerHTML = `🏆 <strong>Rodada Final (38):</strong> sem eliminação — disputa entre os 5 melhores.`;
  }
}

// =======================
// Resumo / histórico
function exibirResumoEliminacao(rodadaAtual) {
  const container = document.getElementById("resumo-eliminacao");
  if (!container) return;

  const times = getListaTimes();

  // Estatísticas da rodada
  const chave = `Rodada ${rodadaAtual}`;
  const pontos = times.map(time => {
    const v = window.pontuacoesPorRodada?.[time]?.[chave];
    return (typeof v === "number") ? { time, pontos: Number(v) } : { time, pontos: 0, _semDado: true };
  });

  let estat = "";
  const temReal = pontos.some(x => !x._semDado && x.pontos !== 0);
  if (temReal) {
    const ordenado = pontos.slice().sort((a, b) => b.pontos - a.pontos);
    const maior = ordenado[0], menor = ordenado[ordenado.length - 1];
    const media = (ordenado.reduce((s, o) => s + o.pontos, 0) / ordenado.length).toFixed(2);
    estat = `
      <h3>📊 Resumo da Rodada ${rodadaAtual}</h3>
      <ul>
        <li><strong>✅ Maior pontuação:</strong> ${maior.time} (${maior.pontos.toFixed(2)} pts)</li>
        <li><strong>❌ Menor pontuação:</strong> ${menor.time} (${menor.pontos.toFixed(2)} pts)</li>
        <li><strong>📊 Média geral:</strong> ${media} pts</li>
      </ul>`;
  } else {
    estat = `<h3>📊 Resumo da Rodada ${rodadaAtual}</h3><p>🕒 Aguardando pontuações.</p>`;
  }

  // Eliminações acumuladas (apresentação informativa; quando não houver dados, marcar "aguardando")
  let elimHTML = `<h3>🔥 Eliminações</h3><ul>`;
  for (let r = RODADA_INICIO; r <= rodadaAtual; r++) {
    const arr = times.map(time => {
      const v = window.pontuacoesPorRodada?.[time]?.[`Rodada ${r}`];
      return (typeof v === "number") ? { time, pontos: Number(v) } : { time, pontos: 0, _semDado: true };
    });

    const real = arr.filter(x => !x._semDado && x.pontos !== 0);
    if (!real.length) {
      elimHTML += `<li>Rodada ${r}: aguardando pontuações</li>`;
      continue;
    }

    const ord = real.sort((a, b) => a.pontos - b.pontos);
    if (r >= 20 && r <= 28) {
      elimHTML += `<li>❌ <strong>Rodada ${r}:</strong> ${ord[0].time}</li>`;
    } else if (r >= 29 && r <= 37) {
      elimHTML += `<li>❌ <strong>Rodada ${r}:</strong> ${ord[0].time} e ${ord[1]?.time}</li>`;
    } else if (r === 38) {
      elimHTML += `<li>🏆 <strong>Rodada 38:</strong> Final (sem eliminação)</li>`;
    }
  }
  elimHTML += `</ul>`;

  container.innerHTML = `${estat}${elimHTML}`;
}
