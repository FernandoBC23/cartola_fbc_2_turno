
// DICIONÁRIO DOS ESCUDOS
const escudosTimes = {
  "FBC Colorado": "../imagens/2_fbc_colorado.png",
  "FBC Colorado II":"../imagens/2_fbc_colorado_II.png",
  "Texas Club 2025": "../imagens/2_texas_club_2025.png",
  "Real SCI": "../imagens/2_real_sci.png",
  "Gig@ntte": "../imagens/2_gigntte.png",
  "PraiaBravaFC": "../imagens/2_praiabravafc.png",
  "OlhaEleAiF.C!": "../imagens/2_olhaeleaifc.png",
  "Gremiomaniasm": "../imagens/2_gremiomaniasm.png",
  "Sport Clube PAIM": "../imagens/2_sport_clube_paim.png",
  "PUXE FC": "../imagens/2_puxe_fc.png",
  "RS Expressões da Arte": "../imagens/2_rs_expressoes_da_arte.png",
  "ZIVI FC": "../imagens/2_zivi_fc.png",
  "O clube do povo Itaqui/Rss": "../imagens/2_o_clube_do_povo_itaqui_rss.png",
  "F.C. Rei Das Copas": "../imagens/2_fc_rei_das_copas.png",
  "Rolo Compressor ZN": "../imagens/2_rolo_compressor_zn.png",
  "Taura da Fronteira FCIII": "../imagens/2_taura_da_fronteira_fciii.png",
  "Eleis-Itaqui": "../imagens/2_eleis_itaqui.png",
  "KING LEONN": "../imagens/2_king_leonn.png",
  "Laranjja Mecannica": "../imagens/2_laranjja_mecannica.png",
  "Fedato Futebol Clube": "../imagens/2_fedato_futebol_clube.png",
  "Perronee F.C": "../imagens/2_perronee_fc.png",
  "Pity10": "../imagens/2_pity10.png",
  "pra sempre imortal fc": "../imagens/2_pra_sempre_imortal_fc.png",
  "RHANKA DENTY FC25": "../imagens/2_rhanka_denty_fc25.png",
  "TEAM LOPES 99": "../imagens/2_team_lopes_99.png",
  "pura bucha /botafogo": "../imagens/2_pura_bucha_botafogo.png",
  "cartola scheuer": "../imagens/2_cartola_scheuer.png",
  "Remo Santo Ângelo": "../imagens/2_remo_santo_angelo.png",
  "Analove10 ITAQUI GRANDE!!":"../imagens/2_analove10_itaqui_grande.png",
  "DM Studio": "../imagens/2_dm_studio.png",
  "lsauer fc": "../imagens/2_lsauer_fc.png",
  "VASCO MARTINS FC": "../imagens/2_vasco_martins_fc.png",
  "KP JUV.": "../imagens/2_kp_juv.png",
  "BORGES ITAQUI F.C.": "../imagens/2_borges_itaqui_fc.png",
  "Profit Soccer": "../imagens/2_profit_soccer.png",
  "Tabajara de Inhaua FC2": "../imagens/2_tabajara_de_inhaua_fc2.png",
  "TIGRE LEON": "../imagens/2_tigre_leon.png",
  "S.E.R. GRILLO": "../imagens/2_ser_grillo.png",
  "seralex": "../imagens/2_seralex.png",
  "E.C. Bororé": "../imagens/2_ec_borore.png",
  "MAFRA MARTINS FC": "../imagens/2_mafra_martins_fc.png",
  "BordonFC": "../imagens/2_bordonfc.png",
  "Tatols Beants F.C": "../imagens/2_tatols_beants_fc.png",
  "FIGUEIRA DA ILHA": "../imagens/2_figueira_da_ilha.png",
  "MauHumor F.C.": "../imagens/2_mauhumor_fc.png",
  "A Lenda Super Vascão f.c": "../imagens/2_a_lenda_super_vascao_fc.png",
  "TATITTA FC": "../imagens/2_tatitta_fc.png",
  "HS SPORTS F.C": "../imagens/2_hs_sports_fc.png",
  "Dom Camillo68": "../imagens/2_dom_camillo68.png",
  "mercearia Estrela": "../imagens/2_mercearia_estrela.png",
  "CosmoCity ZO": "../imagens/2_cosmocity_zo.png",
  "clarinvalau fc": "../imagens/2_clarinvalau_fc.png",
  "Grêmio imortal 37": "../imagens/2_gremio_imortal_37.png",
  "SERGRILLO": "../imagens/2_sergrillo.png",
  "Super Vasco f.c": "../imagens/2_super_vasco_fc.png",
  "A Lenda Super Vasco F.c": "../imagens/2_a_lenda_super_vasco_fc.png",
  "Paulo Virgili FC": "../imagens/2_paulo_virgili_fc.png",
  "CALOMBO ITAQUI RS": "../imagens/2_calombo_itaqui_rs.png",  
  "emer jr fc": "../imagens/2_emer_jr_fc.png",
  "Cril Futebol Club": "../imagens/2_cril_futebol_club.png",
  "Santo Ângelo United": "../imagens/2_santo_angelo_united.png",
  "SUPER VASCÃO F.C": "../imagens/2_super_vascao_fc.png",
  "JV5 Tricolor Gaúcho": "../imagens/2_jv5_tricolor_gaucho.png",
  "BORGES CLIMA FUT F.C": "../imagens/2_borges_clima_fut_fc.png",
  "Noah A 10": "../imagens/2_noah_a_10.png",
  "teves_futsal20 f.c": "../imagens/2_teves_futsal20_fc.png",
  "Rolo Compressor  ZN": "../imagens/2_rolo_compressor_zn.png",
  "Luis lemes inter": "../imagens/2_luis_lemes_inter.png",
  "C.A. Charru@": "../imagens/2_c_a_charrua.png"
};

document.addEventListener("DOMContentLoaded", () => {
  criarAbas();
  exibirClassificacaoPor("geral", "geral");
});

function criarAbas() {
  const container = document.getElementById("tabs-container");
  container.innerHTML = ""; // <-- limpa o conteúdo anterior antes de criar novos elementos

  const abas = [
    { label: "Geral", type: "geral", key: "geral" },
    // { label: "Turno 1", type: "turnos", key: "turno_1" },
    { label: "Turno 2", type: "turnos", key: "turno_2" },
    ...Object.keys(classificacaoLigaClassica.meses).map(mes => ({
      label: mes,
      type: "meses",
      key: mes
    }))
  ];

  // Criação dos botões padrão
  abas.forEach((aba, index) => {
    const btn = document.createElement("button");
    btn.className = "tab" + (index === 0 ? " active" : "");
    btn.textContent = aba.label;
    btn.dataset.type = aba.type;
    btn.dataset.key = aba.key;

    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
      btn.classList.add("active");
      exibirClassificacaoPor(aba.type, aba.key);
    });

    container.appendChild(btn);
  });

  // Adiciona o select se for em tela pequena
  if (window.innerWidth < 768) {
    const select = document.createElement("select");
    select.className = "tab-select";
    abas.forEach(aba => {
      const opt = document.createElement("option");
      opt.value = JSON.stringify(aba);
      opt.textContent = aba.label;
      select.appendChild(opt);
    });

    select.addEventListener("change", () => {
      const aba = JSON.parse(select.value);
      exibirClassificacaoPor(aba.type, aba.key);
    });

    container.appendChild(select);
  }
}


function obterRodadaAtual() {
  const geral = classificacaoLigaClassica.geral;
  const umTimeQualquer = Object.keys(geral)[0];
  const rodadas = Object.keys(geral[umTimeQualquer]);

  const numerosRodadas = rodadas.map(r => {
    const match = r.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  });

  return Math.max(...numerosRodadas);
}


function exibirClassificacaoPor(tipo, chave) {

  console.log("Objeto completo:", classificacaoLigaClassica);

  let dados = [];
  const rodadaAtual = obterRodadaAtual();

  const infoDiv = document.getElementById("info-atualizacao");
  
  // const dataAtualizacao = "13/05/2025"; // pode ser dinâmico no futuro
  const hoje = new Date();
  const dataAtualizacao = hoje.toLocaleDateString("pt-BR");

  infoDiv.innerHTML = `📅 Rodada Atual: <strong>${rodadaAtual}</strong> &nbsp;&nbsp; ⏱️ Última atualização: <strong>${dataAtualizacao}</strong>`;


  if (tipo === "geral") {
    const geral = classificacaoLigaClassica.geral;
    for (const time in geral) {
      const rodadas = geral[time];
      const totalPontos = Object.values(rodadas).reduce((acc, val) => acc + val, 0);
      dados.push({ time, totalPontos });
    }
  } else {
    const registros = classificacaoLigaClassica[tipo][chave];
    for (const time in registros) {
      dados.push({ time, totalPontos: registros[time] });
    }
  }

  const { texto, cor } = gerarStatusDaTag(tipo, chave, rodadaAtual);
  dados.sort((a, b) => b.totalPontos - a.totalPontos);

  console.log("Rodada Atual:", rodadaAtual, "Tipo:", tipo, "Chave:", chave);
  console.log("Tag:", texto, "Cor:", cor);

  renderizarTabela(dados, texto, cor, tipo);
}

function gerarStatusDaTag(tipo, chave, rodadaAtual) {
  if (tipo === "geral" && chave === "geral") {
    if (rodadaAtual <= 37) {
      return { texto: "Zona de Premiação", cor: "amarela" };
    } else {
      return { texto: "Premiados", cor: "verde" };
    }
  }

  if (tipo === "turnos") {
    if (chave === "turno_1") {
      if (rodadaAtual <= 19) {
        return { texto: "Zona de Premiação", cor: "amarela" };
      } else {
        return { texto: "Premiados", cor: "verde" };
      }
    }

    if (chave === "turno_2") {
      if (rodadaAtual < 20) {
        return { texto: "", cor: "" };
      } else if (rodadaAtual <= 37) {
        return { texto: "Zona de Premiação", cor: "amarela" };
      } else {
        return { texto: "Premiados", cor: "verde" };
      }
    }
  }

  if (tipo === "meses") {
    const rodadasPorMes = {
      "Março": [1],
      "Abril": [2, 3, 4, 5, 6],
      "Maio": [7, 8, 9, 10, 11],
      "Junho": [12],
      "Julho": [13, 14, 15, 16, 17],
      "Agosto": [18, 19, 20, 21, 22],
      "Setembro": [23, 24, 25],
      "Outubro": [26, 27, 28],
      "Novembro": [29, 30, 31, 32],
      "Dezembro": [33, 34, 35, 36, 37, 38]
    };
  
    const rodadas = rodadasPorMes[chave];
    if (!rodadas) return { texto: "", cor: "" };
  
    const primeiraRodada = Math.min(...rodadas);
    const ultimaRodada = Math.max(...rodadas);
  
    if (rodadaAtual < primeiraRodada) {
      return { texto: "", cor: "" }; // mês futuro
    }
  
    if (rodadaAtual > ultimaRodada) {
      return { texto: "Premiados", cor: "verde" }; // mês encerrado
    }
  
    return { texto: "Zona de Premiação", cor: "amarela" }; // mês em andamento
  }
  

  return { texto: "", cor: "" };
}


function renderizarTabela(classificacao, tagTexto = "", tagCor = "", tipo = "") {
  const tbody = document.getElementById("classificacao-corpo");
  tbody.innerHTML = "";

  classificacao.forEach((item, index) => {
    const escudo = escudosTimes[item.time] || "escudos/default.png";
    const posicao = index + 1;

    let destaque = "";
    let icone = "";

    // Aplica ícones apenas se não for "geral"
    if (tipo !== "geral") {
      switch (posicao) {
        case 1:
          destaque = "primeiro";
          icone = "🥇";
          break;
        case 2:
          destaque = "segundo";
          icone = "🥈";
          break;
        case 3:
          destaque = "terceiro";
          icone = "🥉";
          break;
        case 4:
        case 5:
          if (tipo === "meses") {
            destaque = "top5";
            icone = "⭐";
          }
          break;
      }
    }

    const row = document.createElement("tr");
    if (destaque) row.classList.add(destaque);

    let exibirTag = false;

    if (tagTexto) {
      if (tipo === "turnos" && posicao <= 3) exibirTag = true;
      if (tipo === "meses" && posicao <= 5) exibirTag = true;
      // Geral: sem TAG
    }

    const tagSpan = exibirTag
      ? `<span class="tag tag-${tagCor}">${tagTexto}</span>`
      : "";

    row.innerHTML = `
      <td>${posicao} ${icone}</td>
      <td>
        <div class="time-info">
          <img src="${escudo}" class="escudo" alt="${item.time}" />
          ${item.time} ${tagSpan}
        </div>
      </td>
      <td>${item.totalPontos.toFixed(2)}</td>
    `;

    tbody.appendChild(row);
  });
}
