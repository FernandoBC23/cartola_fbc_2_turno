import streamlit as st
import pandas as pd
import os

st.set_page_config(page_title="Cadastro de Confrontos", layout="centered")
st.title("📋 Cadastro Rápido de Confrontos por Rodada")

# Função para carregar confrontos de um arquivo CSV
def carregar_confrontos_csv(arquivo="confrontos_serie_A.csv"):
    try:
        if os.path.exists(arquivo):
            df = pd.read_csv(arquivo)
            if {"Rodada", "Confronto", "Time A", "Time B"}.issubset(df.columns):
                return df[["Rodada", "Confronto", "Time A", "Time B"]].values.tolist()
    except Exception as e:
        st.warning(f"Erro ao carregar confrontos salvos: {e}")
    return []

# Função para carregar times do Excel
def carregar_times_excel(arquivo="times.xlsx"):
    try:
        df_times = pd.read_excel(arquivo, sheet_name="Times")
        return sorted(df_times["Nome"].dropna().unique().tolist())
    except Exception:
        st.warning("Arquivo de times não encontrado ou com erro. Adicione manualmente.")
        return []

# Inicializar session_state
if "confrontos" not in st.session_state:
    st.session_state.confrontos = carregar_confrontos_csv()
if "confrontos_por_rodada" not in st.session_state:
    st.session_state.confrontos_por_rodada = len(st.session_state.confrontos)
if "times" not in st.session_state:
    st.session_state.times = carregar_times_excel()

# Adicionar novo time
with st.expander("➕ Cadastrar novo time"):
    novo_time = st.text_input("Nome do novo time:")
    if st.button("Adicionar time"):
        if novo_time and novo_time not in st.session_state.times:
            st.session_state.times.append(novo_time)
            st.session_state.times = sorted(st.session_state.times)
            st.success(f"Time '{novo_time}' adicionado!")
        elif novo_time in st.session_state.times:
            st.warning("Esse time já foi cadastrado.")

# Cálculo automático da rodada e confronto
rodada_atual = st.session_state.confrontos_por_rodada // 10 + 1
confronto_atual = st.session_state.confrontos_por_rodada % 10 + 1

if rodada_atual > 19:
    st.error("Limite de 19 rodadas alcançado.")
else:
    st.subheader(f"🕹️ Rodada {rodada_atual} - Confronto {confronto_atual}")

    col1, col2 = st.columns(2)

    if "select_time_a" not in st.session_state:
        st.session_state.select_time_a = ""
    if "select_time_b" not in st.session_state:
        st.session_state.select_time_b = ""

    with col1:
        st.session_state.select_time_a = st.selectbox(
            "Time A", options=[""] + st.session_state.times, index=0
        )
    with col2:
        st.session_state.select_time_b = st.selectbox(
            "Time B", options=[""] + st.session_state.times, index=0
        )

    # Botão para salvar confronto
    if st.button("Salvar Confronto"):
        time_a = st.session_state.select_time_a
        time_b = st.session_state.select_time_b

        if not time_a or not time_b:
            st.warning("Selecione dois times para registrar o confronto.")
        elif time_a == time_b:
            st.warning("Time A e Time B não podem ser iguais.")
        else:
            st.session_state.confrontos.append([rodada_atual, confronto_atual, time_a, time_b])
            st.session_state.confrontos_por_rodada += 1
            st.success(f"Confronto salvo: {time_a} x {time_b} (Rodada {rodada_atual})")

            # Resetar seleções
            st.session_state.select_time_a = ""
            st.session_state.select_time_b = ""

# Exibir confrontos
if st.session_state.confrontos:
    df = pd.DataFrame(st.session_state.confrontos, columns=["Rodada", "Confronto", "Time A", "Time B"])
    todos_times = pd.unique(df[["Time A", "Time B"]].values.ravel())
    id_times = {time: idx + 1 for idx, time in enumerate(sorted(todos_times))}
    df["ID A"] = df["Time A"].map(id_times)
    df["ID B"] = df["Time B"].map(id_times)

    st.subheader("📊 Tabela de Confrontos Cadastrados")
    st.dataframe(df)

    csv = df.to_csv(index=False).encode('utf-8')
    st.download_button("⬇️ Baixar confrontos em CSV", csv, "confrontos.csv", "text/csv")
