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
    nome: "LIVRO I",
    titulos: [
      {
        nome: "TÍTULO I - Das leis, sua interpretação e aplicação",
        capitulos: [
          {
            nome: "CAPÍTULO I - Fontes do Direito",
            secoes: [],
            artigos: [
              {
                nome: "Art.º 1º - Fontes imediatas",
                texto: "1. São fontes imediatas do direito as leis e as normas corporativas. 2. Consideram-se leis todas as disposições genéricas provindas dos órgãos estaduais competentes; são normas corporativas as regras ditadas pelos organismos representativos das diferentes categorias morais, culturais, económicas ou profissionais, no domínio das suas atribuições, bem como os respectivos estatutos e regulamentos internos. 3. As normas corporativas não podem contrariar as disposições legais de carácter imperativo."
              },
              {
                nome: "Art.º 2º - Assentos",
                texto: "(Revogado pelo do DL nº 329-A/95, de 12/12)"
              },
              {
                nome: "Art.º 3º - Valor jurídico dos usos",
                texto: "1. Os usos que não forem contrários aos princípios da boa fé são juridicamente atendíveis quando a lei o determine. 2. As normas corporativas prevalecem sobre os usos."
              },
              {
                nome: "Art.º 4º - Valor da equidade",
                texto: "Os tribunais só podem resolver segundo a equidade: a) Quando haja disposição legal que o permita; b) Quando haja acordo das partes e a relação jurídica não seja indisponível; c) Quando as partes tenham previamente convencionado recurso à equidade, nos termos aplicáveis à cláusula compromissória."
              }
            ]
          },
          {
            nome: "CAPÍTULO II - Vigência, interpretação e aplicação das leis",
            secoes: [],
            artigos: [
              {
                nome: "Art.º 5º - Começo da vigência da lei",
                texto: "1. A lei só se toma obrigatória depois de publicada no jornal oficial. 2. Entre a publicação e a vigência da lei decorrerá o tempo que a própria lei fixar ou, na falta de fixação, o que for determinado em legislação especial."
              },
              {
                nome: "Art.º 6º - Ignorância ou má interpretação da lei",
                texto: "A ignorância ou má interpretação da lei não justifica a falta do seu cumprimento nem isenta as pessoas das sanções nela estabelecidas"
              },
              {
                nome: "Art.º 7º - Cessação da vigência da lei",
                texto: "1. Quando se não destine a ter vigência temporária, a lei só deixa de vigorar se for revogada por outra lei. 2. A revogação pode resultar de declaração expressa, da incompatibilidade entre as novas disposições e as regras precedentes ou da circunstância de a nova lei regular toda a matéria da lei anterior. 3. A lei geral não revoga a lei especial, excepto se outra for a intenção inequívoca do legislador. 4. A revogação da lei revogatória não importa o renascimento da lei que esta revogara."
              },
              {
                nome: "Art.º 8º - Obrigação de julgar e dever de obediência à lei",
                texto: "1. O tribunal não pode abster-se de julgar, invocando a falta ou obscuridade da lei ou alegando dúvida insanável acerca dos factos em litígio. 2. O dever de obediência à lei não pode ser afastado sob pretexto de ser injusto ou imoral o conteúdo do preceito legislativo. 3. Nas decisões que proferir, o julgador terá em consideração todos os casos que mereçam tratamento análogo, a fim de obter uma interpretação e aplicação uniformes do direito."
              },
              {
                nome: "Art.º 9º - Interpretação da lei",
                texto: "1. A interpretação não deve cingir-se à letra da lei, mas reconstituir a partir dos textos o pensamento legislativo, tendo sobretudo em conta a unidade do sistema jurídico, as circunstâncias em que a lei foi elaborada e as condições específicas do tempo em que é aplicada. 2. Não pode, porém, ser considerado pelo intérprete o pensamento legislativo que não tenha na letra da lei um mínimo de correspondência verbal, ainda que imperfeitamente expresso. 3. Na fixação do sentido e alcance da lei, o intérprete presumirá que o legislador consagrou as soluções mais acertadas e soube exprimir o seu pensamento em termos adequados."
              },
              {
                nome: "Art.º 10º - Integração das lacunas da lei",
                texto: "1. Os casos que a lei não preveja são regulados segundo a norma aplicável aos casos análogos. 2. Há analogia sempre que no caso omisso procedam as razões justificativas da regulamentação do caso previsto na lei. 3. Na falta de caso análogo, a situação é resolvida segundo a norma que o próprio intérprete criaria, se houvesse de legislar dentro do espírito do sistema."
              },
              {
                nome: "Art.º 11º - Normas excepcionais",
                texto: "As normas excepcionais não comportam aplicação analógica, mas admitem interpretação extensiva"
              },
              {
                nome: "Art.º 12º - Aplicação das leis no tempo. Princípio geral",
                texto: "1. A lei só dispõe para o futuro; ainda que lhe seja atribuída eficácia retroactiva, presume- se que ficam ressalvados os efeitos já produzidos pelos factos que a lei se destina a regular. 2. Quando a lei dispõe sobre as condições de validade substancial ou formal de quaisquer factos ou sobre os seus efeitos, entende-se, em caso de dúvida, que só visa os factos novos; mas, quando dispuser directamente sobre o conteúdo de certas relações jurídicas, abstraindo dos factos que lhes deram origem, entender-se-á que a lei abrange as próprias relações já constituídas, que subsistam à data da sua entrada em vigor."
              },
              {
                nome: "Art.º 13º - Aplicação das leis no tempo. Leis interpretativas",
                texto: "1. A lei interpretativa integra-se na lei interpretada, ficando salvos, porem, os efeitos já produzidos pelo cumprimento da obrigação, por sentença passada em julgado, por transacção, ainda que não homologada, ou por actos de análoga natureza. 2. A desistência e a confissão não homologadas pelo tribunal podem ser revogadas pelo desistente ou confitente a quem a lei interpretativa for favorável."
              }
            ]
          },
          {
            nome: "CAPÍTULO III - Direitos dos estrangeiros e conflitos de leis",
            secoes: [
              {
                nome: "SECÇÃO I - Disposições gerais",
                subsecoes: [],
                artigos: [
                  {
                    nome: "Art.º 14º - Condição jurídica dos estrangeiros",
                    texto: "1. Os estrangeiros são equiparados aos nacionais quanto ao gozo de direitos civis, salvo disposição legal em contrário. 2. Não são, porém, reconhecidos aos estrangeiros os direitos que, sendo atribuídos pelo respectivo Estado aos seus nacionais, o não sejam aos portugueses em igualdade de circunstâncias."
                  },
                  {
                    nome: "Art.º 15º - Qualificações",
                    texto: "A competência atribuída a uma lei abrange somente as normas que, pelo seu conteúdo e pela função que têm nessa lei, integram o regime do instituto visado na regra de conflitos"
                  },
                  {
                    nome: "Art.º 16º - Referência à lei estrangeira. Princípio geral",
                    texto: "A referência das normas de conflitos a qualquer lei estrangeira determina apenas, na falta de preceito em contrário, a aplicação do direito interno dessa lei."
                  },
                  {
                    nome: "Art.º 17º - Reenvio para a lei de um terceiro Estado",
                    texto: "1. Se, porém, o direito internacional privado da lei referida pela norma de conflitos portuguesa remeter para outra legislação e esta se considerar competente para regular o caso, é o direito interno desta legislação que deve ser aplicado. 2. Cessa o disposto no número anterior, se a lei referida pela norma de conflitos portuguesa for a lei pessoal e o interessado residir habitualmente em território português ou em país cujas normas de conflitos considerem competente o direito interno do Estado da sua nacionalidade. 3. Ficam, todavia, unicamente sujeitos à regra do nº 1 os casos da tutela e curatela, relações patrimoniais entre os cônjuges, poder paternal, relações entre adoptante e adoptado e sucessão por morte, se a lei nacional indicada pela norma de conflitos devolver para a lei da situação dos bens imóveis e esta se considerar competente."
                  },
                  {
                    nome: "Art.º 18º - Reenvio para a lei portuguesa",
                    texto: "1. Se o direito internacional privado da lei designada pela norma de conflitos devolver para o direito interno português, é este o direito aplicável. 2. Quando, porém, se trate de matéria compreendida no estatuto pessoal, a lei portuguesa só é aplicável se o interessado tiver em território português a sua residência habitual ou se a lei do país desta residência considerar igualmente competente o direito interno português."
                  },
                  {
                    nome: "Art.º 19º - Casos em que não é admitido o reenvio",
                    texto: "1. Cessa o disposto nos dois artigos anteriores, quando da aplicação deles resulte a invalidade ou ineficácia de um negócio jurídico que seria válido ou eficaz segundo a regra fixada no artigo 16º, ou a ilegitimidade de um estado que de outro modo seria legítimo. 2. Cessa igualmente o disposto nos mesmos artigos, se a lei estrangeira tiver sido designada pelos interessados, nos casos em que a designação é permitida."
                  },
                  {
                    nome: "Art.º 20º - Ordenamentos jurídicos plurilegislativos",
                    texto: "1. Quando, em razão da nacionalidade de certa pessoa, for competente a lei de um Estado em que coexistam diferentes sistemas legislativos locais, é o direito interno desse Estado que fixa em cada caso o sistema aplicável. 2. Na falta de normas de direito interlocal, recorre-se ao direito internacional privado do mesmo Estado; e, se este não bastar, considera-se como lei pessoal do interessado a lei da sua residência habitual. 3. Se a legislação competente constituir uma ordem jurídica territorialmente unitária, mas nela vigorarem diversos sistemas de normas para diferentes categorias de pessoas, observar-se-á sempre o estabelecido nessa legislação quanto ao conflito de sistemas."
                  },
                  {
                    nome: "Art.º 21º - Fraude à lei",
                    texto: "Na aplicação das normas de conflitos são irrelevantes as situações de facto ou de direito criadas com o intuito fraudulento de evitar a aplicabilidade da lei que, noutras circunstâncias, seria competente"
                  },
                  {
                    nome: "Art.º 22º - Ordem pública",
                    texto: "1. Não são aplicáveis os preceitos da lei estrangeira indicados pela norma de conflitos, quando essa aplicação envolva ofensa dos princípios fundamentais da ordem pública internacional do Estado português. 2. São aplicáveis, neste caso, as normas mais apropriadas da legislação estrangeira competente ou, subsidiariamente, as regras do direito interno português."
                  },
                  {
                    nome: "Art.º 23º - Interpretação e averiguação do direito estrangeiro",
                    texto: "1. A lei estrangeira é interpretada dentro do sistema a que pertence e de acordo com as regras interpretativas nele fixadas. 2. Na impossibilidade de averiguar o conteúdo da lei estrangeira aplicável, recorrer-se-á à lei que for subsidiariamente competente, devendo adoptar-se igual procedimento sempre que não for possível determinar os elementos de facto ou de direito de que dependa a designação da lei aplicável."
                  },
                  {
                    nome: "Art.º 24º - Actos realizados a bordo",
                    texto: "1. Aos actos realizados a bordo de navios ou aeronaves, fora dos portos ou aeródromos, é aplicável a lei do lugar da respectiva matrícula, sempre que for competente a lei territorial. 2. Os navios e aeronaves militares consideram-se como parte do território do Estado a que pertencem."
                  }
                ]
              },
              {
                nome: "SECÇÃO II - Normas de conflitos",
                subsecoes: [
                  {
                    nome: "SUBSECÇÃO I - Âmbito e determinação da lei pessoal",
                    artigos: [
                      {
                        nome: "Art.º 25º - Âmbito da lei pessoal",
                        texto: "O estado dos indivíduos, a capacidade das pessoas, as relações de família e as sucessões por morte são regulados pela lei pessoal dos respectivos sujeitos, salvas as restrições estabelecidas na presente secção."
                      },
                      {
                        nome: "Art.º 26º - Início e termo da personalidade jurídica",
                        texto: "1. O início e termo da personalidade jurídica são fixados igualmente pela lei pessoal de cada indivíduo. 2. Quando certo efeito jurídico depender da sobrevivência de uma a outra pessoa e estas tiverem leis pessoais diferentes, se as presunções de sobrevivência dessas leis forem inconciliáveis, é aplicável o disposto no nº 2 do artigo 68º."
                      },
                      {
                        nome: "Art.º 27º - Direitos de personalidade",
                        texto: "1. Aos direitos de personalidade, no que respeita à sua existência e tutela e às restrições impostas ao seu exercício, é também aplicável a lei pessoal. 2. O estrangeiro ou apátrida não goza, porém, de qualquer forma de tutela jurídica que não seja reconhecida na lei portuguesa."
                      },
                      {
                        nome: "Art.º 28º - Desvios quanto às consequências da incapacidade",
                        texto: "1. O negócio jurídico celebrado em Portugal por pessoa que seja incapaz segundo a lei pessoal competente não pode ser anulado com fundamento na incapacidade no caso de a lei interna portuguesa, se fosse aplicável, considerar essa pessoa como capaz. 2. Esta excepção cessa, quando a outra parte tinha conhecimento da incapacidade, ou quando o negócio jurídico for unilateral, pertencer ao domínio do direito da família ou das sucessões ou respeitar à disposição de imóveis situados no estrangeiro. 3. Se o negócio jurídico for celebrado pelo incapaz em país estrangeiro, será observada a lei desse país, que consagrar regras idênticas às fixadas nos números anteriores."
                      },
                      {
                        nome: "Art.º 29º - Maioridade",
                        texto: "A mudança da lei pessoal não prejudica a maioridade adquirida segundo a lei pessoal anterior."
                      },
                      {
                        nome: "Art.º 30º - Tutela e institutos análogos",
                        texto: "À tutela e institutos análogos de protecção aos incapazes é aplicável a lei pessoal do incapaz."
                      },
                      {
                        nome: "Art.º 31º - Determinação da lei pessoal",
                        texto: "1. A lei pessoal é a da nacionalidade do indivíduo. 2. São, porém, reconhecidos em Portugal os negócios jurídicos celebrados no pais da residência habitual do declarante, em conformidade com a lei desse país, desde que esta se considere competente."
                      },
                      {
                        nome: "Art.º 32º - Apátridas",
                        texto: "1. A lei pessoal do apátrida é a do lugar onde ele tiver a sua residência habitual ou, sendo menor ou interdito, o seu domicílio legal. 2. Na falta de residência habitual, é aplicável o disposto no nº 2 do artigo 82º."
                      },
                      {
                        nome: "Art.º 33º - Pessoas colectivas",
                        texto: "1. A pessoa colectiva tem como lei pessoal a lei do Estado onde se encontra situada a sede principal e efectiva da sua administração. 2. À lei pessoal compete especialmente regular: a capacidade da pessoa colectiva; a constituição, funcionamento e competência dos seus órgãos; os modos de aquisição e perda da qualidade de associado e os correspondentes direitos e deveres; a responsabilidade da pessoa colectiva, bem como a dos respectivos órgãos e membros, perante terceiros; a transformação, dissolução e extinção da pessoa colectiva. 3. A transferência, de um Estado para outro, da sede da pessoa colectiva não extingue a personalidade jurídica desta, se nisso convierem as leis de uma e outra sede. 4. A fusão de entidades com lei pessoal diferente é apreciada em face de ambas as leis pessoais."
                      },
                      {
                        nome: "Art.º 34º - Pessoas colectivas internacionais",
                        texto: "A lei pessoal das pessoas colectivas internacionais é a designada na convenção que as criou ou nos respectivos estatutos e, na falta de designação, a do país onde estiver a sede principal"
                      }
                    ]
                  },
                  {
                    nome: "SUBSECÇÃO II - Lei reguladora dos negócios jurídicos",
                    artigos: [
                      {
                        nome: "Art.º 35º - Declaração negocial",
                        texto: "1. A perfeição, interpretação e integração da declaração negocial são reguladas pela lei aplicável à substância do negócio, a qual é igualmente aplicável à falta e vícios da vontade. 2. O valor de um comportamento como declaração negocial é determinado pela lei da residência habitual comum do declarante e do destinatário e, na falta desta, pela lei do lugar onde o comportamento de verificou. 3. O valor do silêncio como meio declaratório é igualmente determinado pela lei da residência habitual comum e, na falta desta, pela lei do lugar onde a proposta foi recebida."
                      },
                      {
                        nome: "Art.º 36º - Forma da declaração",
                        texto: "1. A forma da declaração negocial é regulada pela lei aplicável à substância do negócio; é, porém, suficiente a observância da lei em vigor no lugar em que é feita a declaração, salvo se a lei reguladora da substância do negócio exigir, sob pena de nulidade ou ineficácia, a observância de determinada forma, ainda que o negócio seja celebrado no estrangeiro. 2. A declaração negocial é ainda formalmente válida se, em vez da forma prescrita na lei local, tiver sido observada a forma prescrita pelo Estado para que remete a norma de conflitos daquela lei, sem prejuízo do disposto na última parte do número anterior."
                      },
                      {
                        nome: "Art.º 37º - Representação legal",
                        texto: "A representação legal está sujeita à lei reguladora da relação jurídica de que nasce o poder representativo."
                      },
                      {
                        nome: "Art.º 38º - Representação orgânica",
                        texto: "A representação da pessoa colectiva por intermédio dos seus órgãos é regulada pela respectiva lei pessoal."
                      },
                      {
                        nome: "Art.º 39º - Representação voluntária",
                        texto: "1. A representação voluntária é regulada, quanto à existência, extensão, modificação, efeitos e extinção dos poderes representativos, pela lei do Estado em que os poderes são exercidos. 2. Porém, se o representante exercer os poderes representativos em país diferente daquele que o representado indicou e o facto for conhecido do terceiro com quem contrate, é aplicável a lei do país da residência habitual do representado. 3. Se o representante exercer profissionalmente a representação e o facto for conhecido do terceiro contratante, é aplicável a lei do domicílio profissional. 4. Quando a representação se refira à disposição ou administração de bens imóveis, é aplicável a lei do país da situação desses bens."
                      },
                      {
                        nome: "Art.º 40º - Prescrição e caducidade",
                        texto: "A prescrição e a caducidade são reguladas pela lei aplicável ao direito a que uma ou outra se refere."
                      }
                    ]
                  },
                  {
                    nome: "SUBSECÇÃO III - Lei reguladora das obrigações",
                    artigos: [
                      {
                        nome: "Art.º 41º - Obrigações provenientes de negócios jurídicos",
                        texto: "1. As obrigações provenientes de negócio jurídico, assim como a própria substância dele, são reguladas pela lei que os respectivos sujeitos tiverem designado ou houverem tido em vista. 2. A designação ou referência das partes só pode, todavia, recair sobre lei cuja aplicabilidade corresponda a um interesse sério dos declarantes ou esteja em conexão com algum dos elementos do negócio jurídico atendíveis no domínio do direito internacional privado."
                      },
                      {
                        nome: "Art.º 42º - Critério supletivo",
                        texto: "1. Na falta de determinação da lei competente, atende-se, nos negócios jurídicos unilaterais, à lei da residência habitual do declarante e, nos contratos, à lei da residência habitual comum das partes. 2. Na falta de residência comum, é aplicável, nos contratos gratuitos, a lei da residência habitual daquele que atribui o benefício e, nos restantes contratos, a lei do lugar da celebração."
                      },
                      {
                        nome: "Art.º 43º - Gestão de negócios",
                        texto: "À gestão de negócios é aplicável a lei do lugar em que decorre a principal actividade do gestor."
                      },
                      {
                        nome: "Art.º 44º - Enriquecimento sem causa",
                        texto: "O enriquecimento sem causa é regulado pela lei com base na qual se verificou a transferência do valor patrimonial a favor do enriquecido."
                      },
                      {
                        nome: "Art.º 45º - Responsabilidade extracontratual",
                        texto: "1. A responsabilidade extracontratual fundada, quer em acto ilícito, quer no risco ou em qualquer conduta lícita, é regulada pela lei do Estado onde decorreu a principal actividade causadora do prejuízo; em caso de responsabilidade por omissão, é aplicável a lei do lugar onde o responsável deveria ter agido. 2. Se a lei do Estado onde se produziu o efeito lesivo considerar responsável o agente, mas não o considerar como tal a lei do país onde decorreu a sua actividade, é aplicável a primeira lei, desde que o agente devesse prever a produção de um dano, naquele país, como consequência do seu acto ou omissão. 3. Se, porém, o agente e o lesado tiverem a mesma nacionalidade ou, na falta dela, a mesma residência habitual, e se encontrarem ocasionalmente em país estrangeiro, a lei aplicável será a da nacionalidade ou a da residência comum, sem prejuízo das disposições do Estado local que devam ser aplicadas indistintamente a todas as pessoas."
                      }
                    ]
                  },
                  {
                    nome: "SUBSECÇÃO IV - Lei reguladora das coisas",
                    artigos: [
                      {
                        nome: "Art.º 46º - Direitos reais",
                        texto: "1. O regime da posse, propriedade e demais direitos reais, é definido pela lei do Estado em cujo território as coisas se encontrem situadas. 2. Em tudo quanto respeita a constituição ou transferência de direitos reais sobre coisas em trânsito, são estas havidas como situadas no país do destino. 3. A constituição e transferência de direitos sobre os meios de transportes submetidos a um regime de matrícula são reguladas pela lei do país onde a matrícula tiver sido efectuada."
                      },
                      {
                        nome: "Art.º 47º - Capacidade para constituir direitos reais sobre coisas imóveis ou dispor deles",
                        texto: "É igualmente definida pela lei da situação da coisa a capacidade para constituir direitos reais sobre coisas imóveis ou para dispor deles, desde que essa lei assim o determine; de contrário, é aplicável a lei pessoal."
                      },
                      {
                        nome: "Art.º 48º - Propriedade intelectual",
                        texto: "1. Os direitos de autor são regulados pela lei do lugar da primeira publicação da obra e, não estando esta publicada, pela lei pessoal do autor, sem prejuízo do disposto em legislação especial. 2. A propriedade industrial é regulada pela lei do país da sua criação."
                      }
                    ]
                  },
                  {
                    nome: "SUBSECÇÃO V - Lei Reguladora das relações de familia",
                    artigos: [
                      {
                        nome: "Art 49º - Capacidade para contrair casamento ou celebrar convenções antenupciais",
                        texto: "A capacidade para contrair casamento ou celebrar a convenção antenupcial é regulada, em relação a cada nubente, pela respectiva lei pessoal, à qual compete ainda definir o regime da falta e dos vícios da vontade dos contraentes."
                      },
                      {
                        nome: "Art.º 50º - Forma do casamento",
                        texto: "A forma do casamento é regulada pela lei do Estado em que o acto é celebrado, salvo o disposto no artigo seguinte."
                      },
                      {
                        nome: "Art.º 51º - Desvios",
                        texto: "1. O casamento de dois estrangeiros em Portugal pode ser celebrado segundo a forma prescrita na lei nacional de qualquer dos contraentes, perante os respectivos agentes diplomáticos ou consulares, desde que igual competência seja reconhecida por essa lei aos agentes diplomáticos e consulares portugueses. 2. O casamento no estrangeiro de dois portugueses ou de português e estrangeiro pode ser celebrado perante o agente diplomático ou consular do Estado português ou perante os ministros do culto católico; em qualquer caso, o casamento deve ser precedido do processo de publicações, organizado pela entidade competente, a menos que ele seja dispensado nos termos do artigo 1599º. 3. O casamento no estrangeiro de dois portugueses ou de português e estrangeiro, em harmonia com as leis canónicas, é havido como casamento católico, seja qual for a forma legal da celebração do acto segundo a lei local, e à sua transcrição servirá de base o assento do registo paroquial."
                      },
                      {
                        nome: "Art.º 52º - Relações entre os cônjuges",
                        texto: "1. Salvo o disposto no artigo seguinte, as relações entre os cônjuges são reguladas pela lei nacional comum. 2. Não tendo os cônjuges a mesma nacionalidade, é aplicável a lei da sua residência habitual comum e, na falta desta, a lei do país com o qual a vida familiar se ache mais estreitamente conexa.(1)"
                      },
                      {
                        nome: "Art.º 53º - Convenções antenupciais e regime de bens",
                        texto: "1. A substância e efeitos das convenções antenupciais e do regime de bens, legal ou convencional, são definidos pela lei nacional dos nubentes ao tempo da celebração do casamento. 2. Não tendo os nubentes a mesma nacionalidade, é aplicável a lei da sua residência habitual comum à data do casamento e, se esta faltar também, a lei da primeira residência conjugal. 3. Se for estrangeira a lei aplicável e um dos nubentes tiver a sua residência habitual em território português, pode ser convencionado um dos regimes admitidos neste código.(1)"
                      },
                      {
                        nome: "Art.º 54º - Modificações do regime de bens",
                        texto: "1. Aos cônjuges é permitido modificar o regime de bens, legal ou convencional, se a tal forem autorizados pela lei competente nos termos do artigo 52º. 2. A nova convenção em caso nenhum terá efeito retroactivo em prejuízo de terceiro."
                      },
                      {
                        nome: "Art.º 55º - Separação judicial de pessoas e bens e divórcio",
                        texto: "1. À separação judicial de pessoas e bens e ao divórcio é aplicável o disposto no artigo 52º. 2. Se, porém, na constância do matrimónio houver mudança da lei competente, só pode fundamentar a separação ou o divórcio algum facto relevante ao tempo da sua verificação."
                      },
                      {
                        nome: "Art.º 56º - Constituição da filiação",
                        texto: "1. À constituição da filiação é aplicável à lei pessoal do progenitor à data do estabelecimento da relação. 2. Tratando-se de filho de mulher casada, a constituição da filiação relativamente ao pai é regulada pela lei nacional comum da mãe e do marido; na falta desta, é aplicável a lei da residência habitual comum dos cônjuges e, se esta também faltar, a lei pessoal do filho. 3. Para os efeitos do número anterior, atender-se-á ao momento do nascimento do filho ou ao momento da dissolução do casamento, se for anterior ao nascimento.(1)"
                      },
                      {
                        nome: "Art.º 57º - Relações entre pais e filhos",
                        texto: "1. As relações entre pais e filhos são reguladas pela lei nacional comum dos pais e, na falta desta, pela lei da sua residência habitual comum; se os pais residirem habitualmente em Estados diferentes, é aplicável a lei pessoal do filho. 2. Se a filiação apenas se achar estabelecida relativamente a um dos progenitores, aplica- se a lei pessoal deste; se um dos progenitores tiver falecido, é competente a lei pessoal do sobrevivo.(1)"
                      },
                      {
                        nome: "Art.º 58º - Revogado",
                        texto: "(Revogado pelo DL nº 496/77, de 25/11)"
                      },
                      {
                        nome: "Art.º 59º - Revogado",
                        texto: "(Revogado pelo DL nº 496/77, de 25/11)"
                      },
                      {
                        nome: "Art.º 60º - Filiação adoptiva",
                        texto: "1. À constituição da filiação adoptiva é aplicável a lei pessoal do adoptante, sem prejuízo do disposto no número seguinte. 2. Se a adopção for realizada por marido e mulher ou o adoptando for filho do cônjuge do adoptante, é competente a lei nacional comum dos cônjuges e, na falta desta, a lei da sua residência habitual comum; se também esta faltar, será aplicável a lei do país com o qual a vida familiar dos adoptantes se ache mais estreitamente conexa. 3. As relações entre adoptante e adoptado, e entre este e a família de origem, estão sujeitas à lei pessoal do adoptante; no caso previsto no número anterior é aplicável o disposto no artigo 57º. 4. Se a lei competente para regular as relações entre o adoptando e os seus progenitores não conhecer o instituto da adopção, ou não o admitir em relação a quem se encontre na situação familiar do adoptando, a adopção não é permitida.(1)"
                      },
                      {
                        nome: "Art.º 61º - Requisitos especiais da perfilhação ou adopção",
                        texto: "1. Se, como requisito da perfilhação ou adopção, a lei pessoal do perfilhando ou adoptando exigir o consentimento deste, será a exigência respeitada.(1) 2. Será igualmente respeitada a exigência do consentimento de terceiro a quem o interessado esteja ligado por qualquer relação jurídica de natureza familiar ou tutelar, se provier da lei reguladora desta relação."
                      }
                    ]
                  },
                  {
                    nome: "SUBSECÇÃO VI - Lei reguladora das sucessões",
                    artigos: [
                      {
                        nome: "Art.º 62º - Lei competente",
                        texto: "A sucessão por morte é regulada pela lei pessoal do autor da sucessão ao tempo do falecimento deste, competindo-lhe também definir os poderes do administrador da herança e do executor testamentário."
                      },
                      {
                        nome: "Art.º 63º - Capacidade de disposição",
                        texto: "1. A capacidade para fazer, modificar ou revogar uma disposição por morte, bem como as exigências da forma especial das disposições por virtude da idade do disponente, são reguladas pela lei pessoal do autor ao tempo da declaração. 2. Aquele que, depois de ter feito a disposição, adquirir nova lei pessoal conserva a capacidade necessária para revogar a disposição nos termos da lei anterior."
                      },
                      {
                        nome: "Art.º 64º - Interpretação das disposições; falta e vícios da vontade",
                        texto: "É a lei pessoal do autor da herança ao tempo da declaração que regula: a) A interpretação das respectivas cláusulas e disposições, salvo se houver referência expressa ou implícita a outra lei; b) A falta e vícios da vontade; c) A admissibilidade de testamentos de mão comum ou de pactos sucessórios, sem prejuízo, quanto a estes, do disposto no artigo 53º."
                      },
                      {
                        nome: "Art.º 65º - Forma",
                        texto: "1. As disposições por morte, bem como a sua revogação ou modificação, serão válidas, quanto à forma, se corresponderem às prescrições da lei do lugar onde o acto for celebrado, ou às da lei pessoal do autor da herança, quer no momento da declaração, quer no momento da morte, ou ainda às prescrições da lei para que remeta a norma de conflitos da lei local. 2. Se, porém, a lei pessoal do autor da herança no momento da declaração exigir, sob pena de nulidade ou ineficácia, a observância de determinada forma, ainda que o acto seja praticado no estrangeiro, será a exigência respeitada."
                      }
                    ]
                  }
                ],
                artigos: []
              }
            ],
            artigos: []
          }
        ]
      }
    ]
  }
];