/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import {
  Search,
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Clock,
  Landmark,
  Trophy,
  DollarSign,
  ClipboardList,
  ShieldCheck,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

interface RegulamentoPageProps {
  onBack: () => void;
}

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function RegulamentoPage({ onBack }: RegulamentoPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");
  const [hasResults, setHasResults] = useState(true);

  useEffect(() => {
    const container = document.getElementById("regulamento-page-container");
    if (!container) return;

    const termo = normalizeSearch(searchTerm);

    const sections = Array.from(
      container.querySelectorAll<HTMLElement>("[data-rule-section]")
    );

    let visibleSections = 0;

    sections.forEach((section) => {
      const category = section.dataset.category ?? "";

      const categoryMatches =
        activeCategory === "todos" || activeCategory === category;

      const cards = Array.from(
        section.querySelectorAll<HTMLElement>("[data-rule-card]")
      );

      let visibleCards = 0;

      cards.forEach((card) => {
        const cardText = normalizeSearch(card.innerText);
        const searchMatches = !termo || cardText.includes(termo);
        const shouldShow = categoryMatches && searchMatches;

        card.style.display = shouldShow ? "" : "none";

        if (shouldShow) {
          visibleCards += 1;
        }
      });

      const shouldShowSection =
        categoryMatches && visibleCards > 0;

      section.style.display = shouldShowSection ? "" : "none";

      if (shouldShowSection) {
        visibleSections += 1;
      }
    });

    setHasResults(visibleSections > 0);
  }, [searchTerm, activeCategory]);

  const selectSection = (id: string) => {
    const sectionCategory =
      id === "geral"
        ? "geral"
        : id === "jogos"
        ? "jogos"
        : "regulamento";

    setActiveCategory(sectionCategory);
    setSearchTerm("");

    requestAnimationFrame(() => {
      document
        .getElementById(`section-${id}`)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  };

  return (
    <div
      id="regulamento-page-container"
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      {/* CABEÇALHO */}
      <div className="mb-8 flex flex-col justify-between border-b border-[#d4af37]/15 pb-6 sm:flex-row sm:items-center">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 shadow-sm transition hover:border-[#c93b2b]/30 hover:bg-[#c93b2b]/5 hover:text-[#c93b2b]"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#c93b2b]">
              5º Encontro das Divas - Nippon Sorocaba - 2026
            </span>

            <h1 className="mt-1 font-serif text-3xl font-black leading-none tracking-tight text-stone-900">
              REGULAMENTO OFICIAL
            </h1>

            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-stone-500">
              Duplas Femininas
            </p>
          </div>
        </div>

        <div className="mt-4 inline-flex items-center space-x-2 rounded-full border border-stone-200 bg-stone-100 px-4 py-1.5 text-xs font-semibold text-stone-600 sm:mt-0">
          <BookOpen className="h-4 w-4 text-[#b88a1d]" />
          <span>Vigência: Outubro de 2026</span>
        </div>
      </div>

      {/* BUSCA E FILTROS */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="relative md:col-span-6">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
            <Search className="h-4 w-4" />
          </span>

          <input
            type="text"
            placeholder="Pesquisar regra, WO, No-AD, prazo..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-10 pr-4 text-sm font-medium text-stone-800 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-[#c93b2b] focus:ring-1 focus:ring-[#c93b2b]"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:col-span-6 md:pb-0">
          <span className="mr-1 hidden shrink-0 text-xs font-bold uppercase tracking-wider text-stone-400 lg:inline">
            Filtros:
          </span>

          <button
            onClick={() => setActiveCategory("todos")}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              activeCategory === "todos"
                ? "bg-stone-900 text-white shadow-sm"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            Todos
          </button>

          <button
            onClick={() => setActiveCategory("geral")}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              activeCategory === "geral"
                ? "bg-stone-900 text-white shadow-sm"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            Geral
          </button>

          <button
            onClick={() => setActiveCategory("jogos")}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              activeCategory === "jogos"
                ? "bg-stone-900 text-white shadow-sm"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            Jogos
          </button>

          <button
            onClick={() => setActiveCategory("regulamento")}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              activeCategory === "regulamento"
                ? "bg-stone-900 text-white shadow-sm"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            Regulamento
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* ÍNDICE */}
        <aside className="hidden space-y-1 lg:block">
          <span className="mb-2 block px-3 text-[10px] font-bold uppercase tracking-widest text-stone-400">
            Índice de Seções
          </span>

          <button
            onClick={() => selectSection("geral")}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
              activeCategory === "geral"
                ? "border border-[#d4af37]/10 bg-[#d4af37]/15 text-[#8a6512]"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Landmark className="h-4 w-4 text-stone-400" />
              <span>Informações Gerais</span>
            </div>

            <ChevronRight className="h-3 w-3 opacity-60" />
          </button>

          <button
            onClick={() => selectSection("jogos")}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
              activeCategory === "jogos"
                ? "border border-[#d4af37]/10 bg-[#d4af37]/15 text-[#8a6512]"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Clock className="h-4 w-4 text-stone-400" />
              <span>Formato dos Jogos</span>
            </div>

            <ChevronRight className="h-3 w-3 opacity-60" />
          </button>

          <button
            onClick={() => selectSection("classificacao")}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
              activeCategory === "regulamento"
                ? "border border-[#d4af37]/10 bg-[#d4af37]/15 text-[#8a6512]"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Trophy className="h-4 w-4 text-stone-400" />
              <span>Classificação</span>
            </div>

            <ChevronRight className="h-3 w-3 opacity-60" />
          </button>

          <button
            onClick={() => selectSection("premiacao")}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
          >
            <div className="flex items-center space-x-2.5">
              <DollarSign className="h-4 w-4 text-stone-400" />
              <span>Premiação e Taxas</span>
            </div>

            <ChevronRight className="h-3 w-3 opacity-60" />
          </button>

          <button
            onClick={() => selectSection("inscricao")}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
          >
            <div className="flex items-center space-x-2.5">
              <ClipboardList className="h-4 w-4 text-stone-400" />
              <span>Inscrição</span>
            </div>

            <ChevronRight className="h-3 w-3 opacity-60" />
          </button>

          <button
            onClick={() => selectSection("comissao")}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
          >
            <div className="flex items-center space-x-2.5">
              <Users className="h-4 w-4 text-stone-400" />
              <span>Comissão</span>
            </div>

            <ChevronRight className="h-3 w-3 opacity-60" />
          </button>

          <div className="mt-8 space-y-2 rounded-xl border border-orange-100 bg-orange-50/50 p-4">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-orange-800">
              Suporte ao Atleta
            </span>

            <p className="text-[11px] font-semibold leading-relaxed text-orange-700/90">
              Dúvidas, interpretação de regulamento e penalidades serão
              resolvidas pela Comissão Técnica e Disciplinar.
            </p>
          </div>
        </aside>

        {/* CONTEÚDO */}
        <main className="space-y-10 lg:col-span-3">
          {/* INFORMAÇÕES GERAIS */}
          <motion.section
            id="section-geral"
            data-rule-section
            data-category="geral"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm"
          >
            <div className="flex items-center space-x-3 border-b border-stone-100 bg-stone-50 px-6 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c93b2b]/10 text-[#c93b2b]">
                <Landmark className="h-4 w-4" />
              </span>

              <h2 className="font-serif text-lg font-black uppercase tracking-wide text-stone-900">
                Informações Gerais
              </h2>
            </div>

            <div className="divide-y divide-stone-100">
              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Evento
                </span>
                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  5º Encontro das Divas - Nippon Sorocaba - 2026
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Local
                </span>
                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Nippon Sorocaba (União Cultural Esportiva Nipo Brasileira de
                  Sorocaba) — Sede Campestre II, Antiga Estrada de Araçoiaba da
                  Serra, 211 — Araçoiaba da Serra.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Formato do Torneio
                </span>
                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Duplas Femininas.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Data
                </span>
                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  03 de Outubro de 2026 (sábado): início às 8h encerramento às
                  18h00.
                </p>
              </div>
            </div>
          </motion.section>

          {/* FORMATO DOS JOGOS */}
          <motion.section
            id="section-jogos"
            data-rule-section
            data-category="jogos"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm"
          >
            <div className="flex items-center space-x-3 border-b border-stone-100 bg-stone-50 px-6 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c93b2b]/10 text-[#c93b2b]">
                <Clock className="h-4 w-4" />
              </span>

              <h2 className="font-serif text-lg font-black uppercase tracking-wide text-stone-900">
                Formato dos Jogos
              </h2>
            </div>

            <div className="divide-y divide-stone-100">
              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Formato Principal (Melhor de 3 sets)
                </span>
                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Primeira Rodada, Rodadas de Grupo, Semifinais e Finais:
                  Serão disputados em melhor de três (3) sets, no sistema
                  No-AD.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  1º e 2º sets
                </span>
                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Nos 1º e 2º sets serão até quatro (4) games, e não ocorrerá
                  tie-break. Havendo empate em 3 x 3, vence o set quem fizer 4
                  games primeiro.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Empate em sets
                </span>
                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Ocorrendo empate em sets em 1 a 1, o confronto será decidido
                  por meio de tie-break. A dupla vencedora será aquela que
                  atingir sete pontos, com diferença de dois pontos.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Chave Repescagem
                </span>
                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Rodadas da Chave Repescagem, perdedores do 1º jogo e Finais
                  da Repescagens: Disputa em set único até seis (6) games, no
                  sistema No-AD. Havendo empate em 5 x 5 na Repescagem, o
                  confronto será decidido por tie-break. A dupla vencedora
                  será aquela que atingir sete pontos, com diferença de dois
                  pontos.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  No-AD
                </span>
                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Todos os jogos serão disputados com a regra No-AD: o game
                  estando em 40 a 40 será disputado apenas mais um ponto, com a
                  dupla recebedora tendo direito de escolha do lado do saque.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  WO
                </span>
                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Caso ocorra ausência de um jogador no momento do início do
                  jogo, após a devida chamada pela mesa organizadora, será
                  proclamada a vitória do oponente por WO.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Aquecimento
                </span>
                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  As duplas terão 5 minutos de aquecimento a partir do anúncio
                  da chamada do jogo.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Antecedência
                </span>
                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  As atletas devem chegar pelo menos com 1 hora de antecedência
                  aos jogos programados.
                </p>
              </div>
            </div>
          </motion.section>

          {/* CRITÉRIOS DE CLASSIFICAÇÃO */}
          <motion.section
            id="section-classificacao"
            data-rule-section
            data-category="regulamento"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm"
          >
            <div className="flex items-center space-x-3 border-b border-stone-100 bg-stone-50 px-6 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c93b2b]/10 text-[#c93b2b]">
                <Trophy className="h-4 w-4" />
              </span>

              <h2 className="font-serif text-lg font-black uppercase tracking-wide text-stone-900">
                Critérios de Classificação
              </h2>
            </div>

            <div className="divide-y divide-stone-100">
              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Categorias A1, B1 e C — Chaves com 8 ou 9 Duplas
                </span>

                <p className="mt-2 text-sm font-medium leading-relaxed text-stone-600">
                  Sistema de chaveamento com Repescagem e Chave Principal.
                  Vencedores avançam pela Chave Principal e perdedores seguem
                  para a Repescagem.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Categorias A2 e B20 — Chaves com 6 Duplas
                </span>

                <p className="mt-2 text-sm font-bold text-stone-700">
                  Fase de Grupos
                </p>

                <p className="mt-2 text-sm font-medium leading-relaxed text-stone-600">
                  Critérios de classificação na fase de grupos, nesta ordem:
                </p>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm font-medium leading-relaxed text-stone-600">
                  <li>Quantidade de Vitórias;</li>
                  <li>Confronto direto;</li>
                  <li>Saldo de Sets;</li>
                  <li>Saldo de Games;</li>
                  <li>Saldo de Pontos no Tie-Break, se aplicável;</li>
                  <li>Sorteio.</li>
                </ul>

                <p className="mt-5 text-sm font-bold text-stone-700">
                  Finais
                </p>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm font-medium leading-relaxed text-stone-600">
                  <li>
                    As primeiras colocadas de cada Grupo se classificam para a
                    Final Principal;
                  </li>
                  <li>
                    As segundas colocadas de cada Grupo se classificam para a
                    Final Repescagem.
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* PREMIAÇÃO E TAXAS */}
          <motion.section
            id="section-premiacao"
            data-rule-section
            data-category="regulamento"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm"
          >
            <div className="flex items-center space-x-3 border-b border-stone-100 bg-stone-50 px-6 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c93b2b]/10 text-[#c93b2b]">
                <DollarSign className="h-4 w-4" />
              </span>

              <h2 className="font-serif text-lg font-black uppercase tracking-wide text-stone-900">
                Premiação e Taxas
              </h2>
            </div>

            <div className="divide-y divide-stone-100">
              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Troféus
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Troféus para as duplas Campeãs, Vice-Campeãs e Campeãs da
                  Repescagem em todas as Categorias.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Taxa de inscrição
                </span>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm font-medium leading-relaxed text-stone-600">
                  <li>
                    R$ 120,00 por jogadora não associada do Nippon Sorocaba
                  </li>
                  <li>
                    R$ 100,00 por jogadora associada do Nippon Sorocaba
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* INSCRIÇÃO E COMISSÃO */}
          <motion.section
            id="section-inscricao"
            data-rule-section
            data-category="regulamento"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm"
          >
            <div className="flex items-center space-x-3 border-b border-stone-100 bg-stone-50 px-6 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c93b2b]/10 text-[#c93b2b]">
                <ClipboardList className="h-4 w-4" />
              </span>

              <h2 className="font-serif text-lg font-black uppercase tracking-wide text-stone-900">
                Inscrição e Comissão
              </h2>
            </div>

            <div className="divide-y divide-stone-100">
              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Participação por categoria
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Cada participante poderá participar somente de 1 categoria de
                  Duplas.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Alterações pela Comissão
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  A Comissão se reserva ao direito de alterar o sistema de
                  chaveamento, sistema dos jogos e horários em caso de
                  necessidade de ajustes no número/categoria das duplas
                  participantes ou de atrasos por qualquer motivo.
                </p>
              </div>
            </div>
          </motion.section>

          {/* DÚVIDAS E PENALIDADES */}
          <motion.section
            id="section-duvidas"
            data-rule-section
            data-category="regulamento"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm"
          >
            <div className="flex items-center space-x-3 border-b border-stone-100 bg-stone-50 px-6 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c93b2b]/10 text-[#c93b2b]">
                <ShieldCheck className="h-4 w-4" />
              </span>

              <h2 className="font-serif text-lg font-black uppercase tracking-wide text-stone-900">
                Dúvidas e Penalidades
              </h2>
            </div>

            <div className="divide-y divide-stone-100">
              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <p className="text-sm font-medium leading-relaxed text-stone-600">
                  Qualquer dúvida sobre a aplicação e interpretação do
                  regulamento, inclusive sobre penalidades, será resolvida pela
                  Comissão Técnica e Disciplinar, cuja decisão será soberana e
                  definitiva.
                </p>
              </div>
            </div>
          </motion.section>

          {/* CASOS OMISSOS */}
          <motion.section
            id="section-omissos"
            data-rule-section
            data-category="regulamento"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm"
          >
            <div className="flex items-center space-x-3 border-b border-stone-100 bg-stone-50 px-6 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c93b2b]/10 text-[#c93b2b]">
                <BookOpen className="h-4 w-4" />
              </span>

              <h2 className="font-serif text-lg font-black uppercase tracking-wide text-stone-900">
                Casos Omissos
              </h2>
            </div>

            <div className="divide-y divide-stone-100">
              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <p className="text-sm font-medium leading-relaxed text-stone-600">
                  Os casos omissos no presente regulamento serão resolvidos
                  pela Comissão Organizadora.
                </p>
              </div>
            </div>
          </motion.section>

          {/* COMPROVAÇÃO DE IDENTIDADE */}
          <motion.section
            id="section-identidade"
            data-rule-section
            data-category="regulamento"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm"
          >
            <div className="flex items-center space-x-3 border-b border-stone-100 bg-stone-50 px-6 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c93b2b]/10 text-[#c93b2b]">
                <ShieldCheck className="h-4 w-4" />
              </span>

              <h2 className="font-serif text-lg font-black uppercase tracking-wide text-stone-900">
                Comprovação de Identidade
              </h2>
            </div>

            <div className="divide-y divide-stone-100">
              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <p className="text-sm font-medium leading-relaxed text-stone-600">
                  A qualquer momento, a comissão pode pedir RG ou outro
                  documento que prove a identidade conforme a inscrição
                  prévia.
                </p>
              </div>
            </div>
          </motion.section>

          {/* TERMO DE RESPONSABILIDADE */}
          <motion.section
            id="section-responsabilidade"
            data-rule-section
            data-category="regulamento"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm"
          >
            <div className="flex items-center space-x-3 border-b border-stone-100 bg-stone-50 px-6 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c93b2b]/10 text-[#c93b2b]">
                <ShieldCheck className="h-4 w-4" />
              </span>

              <h2 className="font-serif text-lg font-black uppercase tracking-wide text-stone-900">
                Termo de Responsabilidade
              </h2>
            </div>

            <div className="divide-y divide-stone-100">
              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <p className="text-sm font-medium leading-relaxed text-stone-600">
                  As atletas participantes, ao se inscreverem no Torneio,
                  <strong className="font-black text-stone-800">
                    {" "}
                    DECLARAM
                  </strong>{" "}
                  que estão cientes de todas as cláusulas e condições,
                  estipuladas no Regulamento do Torneio, e que exoneram o
                  Nippon Sorocaba, seus organizadores, colaboradores,
                  patrocinadores e apoiadores de{" "}
                  <strong className="font-black text-stone-800">
                    TODA E QUALQUER RESPONSABILIDADE
                  </strong>{" "}
                  tais como problemas de danos materiais, morais, físicos ou de
                  saúde, sejam elas de que natureza forem, entre qualquer outro
                  fato decorrentes de sua participação no Torneio.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <p className="text-sm font-medium leading-relaxed text-stone-600">
                  Autorizam o uso de sua imagem e voz, para fins de divulgação
                  do evento, por fotos, vídeos e entrevistas e qualquer meio de
                  comunicação, entre outras modalidades, sem geração de ônus
                  para o Nippon Sorocaba, organizadores, mídia, patrocinadores
                  e apoiadores.
                </p>
              </div>
            </div>
          </motion.section>

          {/* COMISSÃO ORGANIZADORA */}
          <motion.section
            id="section-comissao"
            data-rule-section
            data-category="regulamento"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm"
          >
            <div className="flex items-center space-x-3 border-b border-stone-100 bg-stone-50 px-6 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c93b2b]/10 text-[#c93b2b]">
                <Users className="h-4 w-4" />
              </span>

              <h2 className="font-serif text-lg font-black uppercase tracking-wide text-stone-900">
                Comissão Organizadora
              </h2>
            </div>

            <div className="divide-y divide-stone-100">
              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <ul className="space-y-2 text-sm font-medium leading-relaxed text-stone-600">
                  <li>Milton Toshihiko Tsubaki</li>
                  <li>Sergio Shigueo Takeda</li>
                  <li>Raquel Takeda Sakanaka</li>
                  <li>Tomoko Kanaschiro</li>
                  <li>Israel Valle</li>
                </ul>

                <p className="mt-5 border-t border-stone-100 pt-5 text-sm font-bold leading-relaxed text-stone-700">
                  Diretoria do Departamento de Tênis - Nippon Sorocaba -
                  Gestão 2026.
                </p>
              </div>
            </div>
          </motion.section>

          {/* SEM RESULTADOS */}
          {!hasResults && (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-white py-16 text-center">
              <span className="block font-serif text-base italic text-stone-400">
                Nenhuma regra encontrada
              </span>

              <p className="mt-1 text-xs text-stone-500">
                Experimente buscar por outros termos como “No-AD”, “WO”,
                “classificação”, “taxa” ou “repescagem”.
              </p>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("todos");
                }}
                className="mt-4 text-xs font-bold uppercase text-[#c93b2b] hover:underline"
              >
                Limpar filtros e busca
              </button>
            </div>
          )}
        </main>
      </div>

      {/* VOLTAR */}
      <div className="mt-12 flex justify-center border-t border-[#d4af37]/15 pt-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 rounded-full bg-stone-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-stone-800"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar para a Página Principal</span>
        </button>
      </div>
    </div>
  );
}