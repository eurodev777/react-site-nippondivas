/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { DIRECTORS } from "../data";
import { Users, Mail, Phone, CalendarRange } from "lucide-react";
import { motion } from "motion/react";

export default function Diretoria() {
  // We can render professional representative headshot layouts with styled Japanese/sports backgrounds
  const getAvatarStyle = (initials: string) => {
    switch (initials) {
      case "MT":
        return "from-amber-500 to-amber-700 text-amber-50";
      case "IC":
        return "from-blue-500 to-blue-700 text-blue-50";
      case "ST":
        return "from-emerald-500 to-emerald-700 text-emerald-50";
      case "TK":
        return "from-rose-500 to-rose-700 text-rose-50";
      case "RT":
        return "from-violet-500 to-violet-700 text-violet-50";
      default:
        return "from-stone-500 to-stone-700 text-stone-50";
    }
  };

  return (
    <section
      id="diretoria"
      className="relative bg-gradient-to-r from-[#2E0622] to-[#4D0D35] text-white py-16 border-t border-b border-gold/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex justify-center mb-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/10">
              <Users className="h-4 w-4" />
            </span>
          </div>
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.25em]">
            Conselho & Liderança
          </h2>
          <h3 className="mt-2 font-serif text-3xl font-extrabold md:text-4xl tracking-tight leading-none">
            Diretoria do Departamento de Tênis 2026
          </h3>
          <p className="mt-3 text-sm text-stone-200 max-w-xl mx-auto leading-relaxed">
            A comissão responsável pela organização, coordenação técnica e
            garantia de fair play ao longo de todo o 5º Encontro das Divas.
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {DIRECTORS.map((director, index) => {
            const avatarColor = getAvatarStyle(director.initials);
            return (
              <motion.div
                key={director.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -4,
                  borderColor: "#b38e41",
                  boxShadow: "0 10px 20px -10px rgba(179, 142, 65, 0.12)",
                }}
                className="flex flex-col items-center p-5 rounded-2xl bg-transparent backdrop-blur-xs text-center transition-all"
              >
                {/* Custom Styled Avatar Card representing the headshot */}
                <div className="relative mb-4 h-40 w-28 overflow-hidden shadow-xs">
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${avatarColor}`}
                  >
                    <img src={director.initials} className="object-cover h-full w-full" />
                    {/* Tiny subtle circular Japanese design element */}
                    <div className="absolute right-1 bottom-1 h-5 w-5 rounded-full border border-white/20 flex items-center justify-center">
                      <span className="text-[6px] font-bold opacity-60">
                        印
                      </span>
                    </div>
                  </div>
                  {/* Glass shimmer effect */}
                  <div className="absolute inset-0 bg-linear-gradient(from-top-left-to-bottom-right, rgba(255,255,255,0.15), transparent)" />
                </div>

                {/* Director Name */}
                <h4 className="font-sans text-sm font-bold text-white">
                  {director.name}
                </h4>

                {/* Director Role */}
                <p className="mt-1 lg:text-xs text-[10px] font-semibold text-white tracking-wide uppercase">
                  {director.role}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center max-w-4xl mx-auto space-y-8">
          {/* Quote block */}
          <div className="relative py-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-gold/30" />
            <h3 className="text-lg md:text-2xl">
              5º Encontro das Divas – Nippon Sorocaba Tênis
            </h3>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-gold/30" />
          </div>

          {/* Beautiful welcome prose */}
          <div className="space-y-6 text-sm leading-relaxed font-medium text-justify md:text-center md:px-6">
            <p>
              <strong className="">
                Mais que tênis. Grandes encontros.
              </strong>
              <br />O 5º Encontro das Divas chega para mais uma edição especial
              no Nippon Sorocaba Tênis, reunindo mulheres que compartilham a
              paixão pelo esporte, pela amizade e pelos bons momentos dentro e
              fora das quadras. No dia 03 de outubro, a partir das 8h, teremos
              uma programação preparada especialmente para receber nossas
              atletas e suas famílias. O torneio feminino será disputado nas
              categorias A, B e C, com as duplas formadas por sorteio,
              proporcionando integração, novas parcerias e muita diversão
              durante os jogos.
            </p>

            <p>
              As campeãs e vice-campeãs serão premiadas com troféus, e a
              competição também contará com repescagem, garantindo ainda mais
              tênis ao longo do evento. As participantes também receberão um
              brinde especial preparado para marcar esta edição. Um dia para
              toda a família O Encontro das Divas acontece junto a uma
              programação especial de Dia das Crianças, reforçando uma das
              características mais importantes do Nippon Sorocaba: ser um espaço
              onde esporte, amizade e família se encontram. As crianças terão
              recreação especial, enquanto atletas, familiares, amigos e
              convidados poderão aproveitar o dia e participar também do almoço
              do evento.
            </p>
            <p className="text-center text-white text-base font-bold block">
              Juntas por essa causa
            </p>
            <p>
              Nesta edição, o rosa ganha um significado ainda mais especial. O
              5º Encontro das Divas abraça também a conscientização do Outubro
              Rosa, unindo nossas atletas em torno de uma mensagem de cuidado,
              prevenção e valorização da saúde da mulher. Porque quando entramos
              em quadra juntas, podemos fazer muito mais do que disputar pontos.
              Esporte. Amizade. Família. Juntas por essa causa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
