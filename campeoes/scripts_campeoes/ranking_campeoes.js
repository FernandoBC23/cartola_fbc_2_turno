
// DICIONÁRIO DOS ESCUDOS
const escudosTimes = {
  "FBC Colorado": "../imagens/2_fbc_colorado.png",
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
  "Luis lemes inter": "../imagens/2_luis_lemes_inter.png",
  "emer jr fc": "../imagens/2_emer_jr_fc.png",
  "Cril Futebol Club": "../imagens/2_cril_futebol_club.png",
  "Santo Ângelo United": "../imagens/2_santo_angelo_united.png",
};

document.addEventListener("DOMContentLoaded", () => {
  const corpoTabela = document.getElementById("corpo-ranking-campeoes");

  const rankingOrdenado = [...rankingTop5Mensal].sort((a, b) => b.pontos - a.pontos);

  rankingOrdenado.forEach((time, index) => {
    const linha = document.createElement("tr");

    const celulaPos = document.createElement("td");
    celulaPos.textContent = `${index + 1}º`;

    const celulaNome = document.createElement("td");
    celulaNome.textContent = time.time;

    const escudo = escudosTimes[time.time]
        ? `<img src="${escudosTimes[time.time]}" alt="Escudo" class="escudo">`
        : "";
      celulaNome.innerHTML = `<span class="time-info">${escudo} ${time.time}</span>`;

    const celulaPontos = document.createElement("td");
    celulaPontos.textContent = time.pontos;

    const celulaAparicoes = document.createElement("td");
    celulaAparicoes.textContent = time.aparicoes;

    const celulaMeses = document.createElement("td");
    celulaMeses.textContent = time.posicoes.map(p => `${p.mes} (${p.posicao}º)`).join(", ");

    linha.appendChild(celulaPos);
    linha.appendChild(celulaNome);
    linha.appendChild(celulaPontos);
    linha.appendChild(celulaAparicoes);
    linha.appendChild(celulaMeses);

    corpoTabela.appendChild(linha);
  });
});
