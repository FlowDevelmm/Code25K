export interface Artigo {
  nome: string;
  texto: string;
}

export interface Subsecao {
  nome: string;
  artigos: Artigo[];
  subsecoes?: Subsecao[];
}

export interface Secao {
  nome: string;
  subsecoes?: Subsecao[];
  artigos: Artigo[];
}

export interface Capitulo {
  nome: string;
  secoes?: Secao[];
  artigos: Artigo[];
}

export interface Titulo {
  nome: string;
  capitulos: Capitulo[];
}

export interface Livro {
  nome: string;
  titulos: Titulo[];
}

export const codigoCivil: Livro[] = [
  {
    "nome": "LIVRO I",
    "titulos": [
      {
        "nome": "TÍTULO I - Das leis, sua interpretação e aplicação",
        "capitulos": [
          {
            "nome": "CAPÍTULO I - Fontes do Direito",
            "secoes": [],
            "artigos": [
              {
                "nome": "Art.º 1º - Fontes imediatas",
                "texto": "1. São fontes imediatas do direito as leis e as normas corporativas. 2. Consideram-se leis todas as disposições genéricas provindas dos órgãos estaduais competentes; são normas corporativas as regras ditadas pelos organismos representativos das diferentes categorias morais, culturais, económicas ou profissionais, no domínio das suas atribuições, bem como os respectivos estatutos e regulamentos internos. 3. As normas corporativas não podem contrariar as disposições legais de carácter imperativo."
              },
              {
                "nome": "Art.º 2º - Assentos",
                "texto": "(Revogado pelo do DL nº 329-A/95, de 12/12)"
              },
              {
                "nome": "Art.º 3º - Valor jurídico dos usos",
                "texto": "1. Os usos que não forem contrários aos princípios da boa fé são juridicamente atendíveis quando a lei o determine. 2. As normas corporativas prevalecem sobre os usos."
              },
              {
                "nome": "Art.º 4º - Valor da equidade",
                "texto": "Os tribunais só podem resolver segundo a equidade: a) Quando haja disposição legal que o permita; b) Quando haja acordo das partes e a relação jurídica não seja indisponível; c) Quando as partes tenham previamente convencionado recurso à equidade, nos termos aplicáveis à cláusula compromissória."
              }
            ]
          },
          {
            "nome": "CAPÍTULO II - Vigência, interpretação e aplicação das leis",
            "secoes": [],
            "artigos": [
              {
                "nome": "Art.º 5º - Começo da vigência da lei",
                "texto": "1. A lei só se toma obrigatória depois de publicada no jornal oficial. 2. Entre a publicação e a vigência da lei decorrerá o tempo que a própria lei fixar ou, na falta de fixação, o que for determinado em legislação especial."
              },
              {
                "nome": "Art.º 6º - Ignorância ou má interpretação da lei",
                "texto": "A ignorância ou má interpretação da lei não justifica a falta do seu cumprimento nem isenta as pessoas das sanções nela estabelecidas"
              },
              {
                "nome": "Art.º 7º - Cessação da vigência da lei",
                "texto": "1. Quando se não destine a ter vigência temporária, a lei só deixa de vigorar se for revogada por outra lei. 2. A revogação pode resultar de declaração expressa, da incompatibilidade entre as novas disposições e as regras precedentes ou da circunstância de a nova lei regular toda a matéria da lei anterior. 3. A lei geral não revoga a lei especial, excepto se outra for a intenção inequívoca do legislador. 4. A revogação da lei revogatória não importa o renascimento da lei que esta revogara."
              },
              {
                "nome": "Art.º 8º - Obrigação de julgar e dever de obediência à lei",
                "texto": "1. O tribunal não pode abster-se de julgar, invocando a falta ou obscuridade da lei ou alegando dúvida insanável acerca dos factos em litígio. 2. O dever de obediência à lei não pode ser afastado sob pretexto de ser injusto ou imoral o conteúdo do preceito legislativo. 3. Nas decisões que proferir, o julgador terá em consideração todos os casos que mereçam tratamento análogo, a fim de obter uma interpretação e aplicação uniformes do direito."
              },
              {
                "nome": "Art.º 9º - Interpretação da lei",
                "texto": "1. A interpretação não deve cingir-se à letra da lei, mas reconstituir a partir dos textos o pensamento legislativo, tendo sobretudo em conta a unidade do sistema jurídico, as circunstâncias em que a lei foi elaborada e as condições específicas do tempo em que é aplicada. 2. Não pode, porém, ser considerado pelo intérprete o pensamento legislativo que não tenha na letra da lei um mínimo de correspondência verbal, ainda que imperfeitamente expresso. 3. Na fixação do sentido e alcance da lei, o intérprete presumirá que o legislador consagrou as soluções mais acertadas e soube exprimir o seu pensamento em termos adequados."
              },
              {
                "nome": "Art.º 10º - Integração das lacunas da lei",
                "texto": "1. Os casos que a lei não preveja são regulados segundo a norma aplicável aos casos análogos. 2. Há analogia sempre que no caso omisso procedam as razões justificativas da regulamentação do caso previsto na lei. 3. Na falta de caso análogo, a situação é resolvida segundo a norma que o próprio intérprete criaria, se houvesse de legislar dentro do espírito do sistema."
              },
              {
                "nome": "Art.º 11º - Normas excepcionais",
                "texto": "As normas excepcionais não comportam aplicação analógica, mas admitem interpretação extensiva"
              },
              {
                "nome": "Art.º 12º - Aplicação das leis no tempo. Princípio geral",
                "texto": "1. A lei só dispõe para o futuro; ainda que lhe seja atribuída eficácia retroactiva, presume- se que ficam ressalvados os efeitos já produzidos pelos factos que a lei se destina a regular. 2. Quando a lei dispõe sobre as condições de validade substancial ou formal de quaisquer factos ou sobre os seus efeitos, entende-se, em caso de dúvida, que só visa os factos novos; mas, quando dispuser directamente sobre o conteúdo de certas relações jurídicas, abstraindo dos factos que lhes deram origem, entender-se-á que a lei abrange as próprias relações já constituídas, que subsistam à data da sua entrada em vigor."
              },
              {
                "nome": "Art.º 13º - Aplicação das leis no tempo. Leis interpretativas",
                "texto": "1. A lei interpretativa integra-se na lei interpretada, ficando salvos, porem, os efeitos já produzidos pelo cumprimento da obrigação, por sentença passada em julgado, por transacção, ainda que não homologada, ou por actos de análoga natureza. 2. A desistência e a confissão não homologadas pelo tribunal podem ser revogadas pelo desistente ou confitente a quem a lei interpretativa for favorável."
              }
            ]
          }
        ]
      }
    ]
  }
]