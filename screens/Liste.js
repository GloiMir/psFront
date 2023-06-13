//Liste de chansons de la chorale
import { View, Text, TouchableOpacity,ScrollView,Dimensions, StatusBar } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { loadSongs,loadSongsAdmin,setTitre } from '../redux/actions';
import { getSongs } from '../storage';
import {Overlay} from 'react-native-elements'

const psaumes = [
  {verset:'Psaumes 23,1',content:"L'Éternel est mon berger je ne manquerais de rien, il me fait reposer dans des verts paturages"},
  {verset:'Psaumes 25,20',content:"Garde mon âme et sauve-moi ! Que je ne sois pas confus, Quand je cherche auprès de toi mon refuge !"},
  {verset:'Psaumes 26,8',content:"Éternel ! j'aime le séjour de ta maison, Le lieu où ta gloire habite."},
  {verset:'Psaumes 29,2',content:"Rendez à l'Éternel gloire pour son nom ! Prosternez-vous devant l'Éternel avec des ornements sacrés !"},
  {verset:'Psaumes 29,9',content:"La voix de l'Éternel fait enfanter les biches, Elle dépouille les forêts. Dans son palais tout s'écrie : Gloire !"},
  {verset:'Psaumes 31,9',content:" Aie pitié de moi, Éternel ! car je suis dans la détresse ; J'ai le visage, l'âme et le corps usés par le chagrin."},
  {verset:'Psaumes 100,2',content:"Servez l'Éternel, avec joie, Venez avec allégresse en sa présence !"},
  {verset:'Psaumes 100,3',content:"Sachez que l'Éternel est Dieu ! C'est lui qui nous a faits, et nous lui appartenons ; Nous sommes son peuple, et le troupeau de son pâturage."},
  {verset:'Psaumes 101,2',content:"Je prendrai garde à la voie droite. Quand viendras-tu à moi ? Je marcherai dans l'intégrité de mon coeur, Au milieu de ma maison."},
  {verset:'Psaumes 101,7',content:"Celui qui se livre à la fraude n'habitera pas dans ma maison ; Celui qui dit des mensonges ne subsistera pas en ma présence."},
  {verset:'Psaumes 103,13',content:"Comme un père a compassion de ses enfants, L'Éternel a compassion de ceux qui le craignent."},
  {verset:'Psaumes 104,1',content:"Mon âme, bénis l'Éternel ! Éternel, mon Dieu, tu es infiniment grand ! Tu es revêtu d'éclat et de magnificence !"},
  {verset:'Psaumes 111,2',content:"Les oeuvres de l'Éternel sont grandes, Recherchées par tous ceux qui les aiment."},
  {verset:'Psaumes 111,10',content:"La crainte de l'Éternel est le commencement de la sagesse ; Tous ceux qui l'observent ont une raison saine. Sa gloire subsiste à jamais."},
  {verset:'Psaumes 112,4',content:"La lumière se lève dans les ténèbres pour les hommes droits, Pour celui qui est miséricordieux, compatissant et juste."},
  {verset:'Psaumes 112,5',content:"Heureux l'homme qui exerce la miséricorde et qui prête. Qui règle ses actions d'après la justice."},
  {verset:'Psaumes 116,5',content:"L'Éternel est miséricordieux et juste, Notre Dieu est plein de compassion ;"},
  {verset:'Psaumes 118,5',content:"Du sein de la détresse j'ai invoqué l'Éternel : L'Éternel m'a exaucé, m'a mis au large."},
  {verset:'Psaumes 118,9',content:"Mieux vaut chercher un refuge en l'Éternel Que de se confier aux grands."},
  {verset:'Psaumes 119,9',content:"Comment le jeune homme rendra-t-il pur son sentier ? En se dirigeant d'après ta parole."},
]
const liste = [
  {
      "_id": "6486b0724079f7949f6c9f2a",
      "auteur": "",
      "titre": "A pataye",
      "corps": [
          {
              "type": "refrain",
              "content": "Apataye muke amepata \nKitu kizuri biblia ya sema, \nHeri wa wili kuliko mumoja ah ah \nKuliko mumoja \n"
          },
          {
              "type": "couplet",
              "content": "Biblia ya sema kweli wa ndugu\nBiblia ya sema kweli wa ndugu\nMume ata acha baba na mama\nNa ku ambatana na muke wake\nHao wa wili mwili mumoja\nHao wa wili mwili mumoja\n"
          },
          {
              "type": "refrain",
              "content": "Mubarikiwe katika unyumba wenu\nMu barikiwe katika unyumba wenu\nMupendane bila unafiki \nHapo ndipo mutazipata \nBaraka Baraka Baraka."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486c5dc4079f7949f6c9f5e",
      "auteur": "",
      "titre": "Afrika amani",
      "corps": [
          {
              "type": "refrain",
              "content": "Ah Afrika twalia amani yo, Afrika twaomba amani, eh mungu utu shindie, twakosa amani inchini  mwetu Kongo oh Ee bwana utu onee hurua ah ah Afrika twalia amani yo Afrika twa omba amini Ee mungu utu onee huruma ah ah"
          },
          {
              "type": "couplet",
              "content": "Tuna kusihi baba kwa rehema zako tuletee amani amani amani ni wewe peke ndiwe tumaini letu"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486c54e4079f7949f6c9f5b",
      "auteur": "Frère Dudos",
      "titre": "Alikuja kwa walio wake",
      "corps": [
          {
              "type": "couplet",
              "content": "Kwa maana gisi mungu, \nKaupenda ulimwengu, \nHata kamutoa mwana wake wapekee, \nIli kila atakaye, \nMu amini asi potee \nBali awe na uzima wamilele.\n"
          },
          {
              "type": "refrain",
              "content": "Ali kuja kwawalio wake, \nIla walio wake walimukataa \nBali walio mpokea aliwapa \nUwezo wa ku itwa wana wa mungu."
          },
          {
              "type": "couplet",
              "content": "Mupokee yesu ili akae ndani yako, \nIli nawe u itwe mwana wa mungu \nUpate uzima wa milele\n\nKiambaza kilicho tutenga naye mungu baba\nYesu ali kibomoa, \nNeema bado ingalipo ndugu yangu \nYesu ana ku ita."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486dc6f9aa61ce3ad06107e",
      "auteur": "Frère Dudos",
      "titre": "Alikuja kwa walio wake",
      "corps": [
          {
              "type": "couplet",
              "content": "Kwa maana gisi mungu, \nKaupenda ulimwengu, \nHata kamutoa mwana wake wapekee, \nIli kila atakaye, \nMu amini asi potee \nBali awe na uzima wamilele.\n"
          },
          {
              "type": "refrain",
              "content": "Ali kuja kwawalio wake, \nIla walio wake walimukataa \nBali walio mpokea aliwapa \nUwezo wa ku itwa wana wa mungu."
          },
          {
              "type": "couplet",
              "content": "Mupokee yesu ili akae ndani yako, \nIli nawe u itwe mwana wa mungu \nUpate uzima wa milele\n\nKiambaza kilicho tutenga naye mungu baba\nYesu ali kibomoa, \nNeema bado ingalipo ndugu yangu \nYesu ana ku ita."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6481e46b688752b33c072933",
      "auteur": "Frères Jimmy et Raph",
      "titre": "Allez vers tous les peuples",
      "corps": [
          {
              "type": "refrain",
              "content": "Allez vers tous les peuples, \nVers toutes les nations, \nAllez vers toutes les races \nPour annoncer l’évangile"
          },
          {
              "type": "couplet",
              "content": "Jésus dira à Nicodème, \nComme il te dit dès lors, \nQue tu ne peux hériter le royaume, \nSans être né de nouveau"
          },
          {
              "type": "couplet",
              "content": "Voilà l’importance du baptême, \nUne marque de la croyance, \nUne façon de confesser \nQue christ est le sauveur\n\n"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486ba994079f7949f6c9f41",
      "auteur": "Frère Raphaël ",
      "titre": "Auprès de toi",
      "corps": [
          {
              "type": "couplet",
              "content": "Tout près de toi\nAuprès de toi\nPlus près de toi je veux demeurer "
          },
          {
              "type": "refrain",
              "content": "Plus près de toi, le reste de ma vie. \nPlus près de toi dans ta présence.     \nPlus près de toi, dans les rayons de ta splendeur, \nPlus de toi dans ta gloire qui gouverne"
          },
          {
              "type": "couplet",
              "content": "Dans la vallée de mes l’espérance,     \nOù le soleil ne brille pas                    \nOù les vents ne soufflent pas               \nOù  la guerre n'est pas le mode            \nEt la misère est maîtrisée"
          },
          {
              "type": "refrain",
              "content": "(Tout près de toi ah ah ah ah)\nMon asile préféré\n(Auprès de toi)\nOù mes rêves prennent chaire\n(Plus près de toi)\nAu bord de la rive du bonheur."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6482a636f693389bb4948d42",
      "auteur": "Frères Jimm et Polin",
      "titre": "Baada ziki za duniya ",
      "corps": [
          {
              "type": "couplet",
              "content": "Baada ziki za dunia, \nNjaa teso nazo shida, \nMbingu tuta kapo fika, \nTutapanguzwa chozi naye Bwana\nTuta pewa taji ushindi, ni shangwe kua naye bwana.\n\nOh oh oh, oh oh oh oh, oh oh oh, alleluia x2\n"
          },
          {
              "type": "refrain",
              "content": "Milele tuta imba nawa malaika oh oh x4. \nTuta shangilia"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6481d0176b5d0a602ad3dbf4",
      "auteur": "Frère L. Kayamba",
      "titre": "Cherches l’Éternel",
      "corps": [
          {
              "type": "couplet",
              "content": "Cherche l’Éternel pendant qu’il se trouve, invoquez-le, tandis qu’il est près, avant que ne surviennent les mauvais jours, où vous le chercherez et ne le trouverez point."
          },
          {
              "type": "refrain",
              "content": "Que le pécheur abandonne sa voie, et se tourne vers Dieu le créateur, notre Dieu est toujours près à pardonner"
          },
          {
              "type": "refrain",
              "content": "Que l’homme sans foi na  loi abandonne sa voie, et se tourne vers Dieu le créateur, notre Dieu est toujours près à pardonner."
          },
          {
              "type": "couplet",
              "content": "La vie nous n’avons qu’une seule puis vient le jugement, or, ceux qui sont en christ ne sont point jugés."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6481ceeb6b5d0a602ad3dbb1",
      "auteur": "Frère Raphael",
      "titre": "D'abord le royaume de Dieu",
      "corps": [
          {
              "type": "couplet",
              "content": "Cherche d’abord le royaume de Dieu, et la justice qu’il demande et le reste vous sera donné par-dessus tous, soyez toujours dans la joie, remerciez Dieu à tous égards éclairer par le saint esprit de Dieu"
          },
          {
              "type": "couplet",
              "content": "Ne vous souciez pas du demain, de ce que vous serez demain, demain se souciera de lui-même,"
          },
          {
              "type": "refrain",
              "content": "A chaque jour suffit sa peine, ne vous souciez pas du demain, demain se souciera de lui-même "
          },
          {
              "type": "couplet",
              "content": "Observez les oiseaux les animaux, ils ne sèment ni moissonnent, mais ils espèrent à demain"
          },
          {
              "type": "refrain",
              "content": "N’êtes pas crées à limage de Dieu, qui reçois une pierre sil demande du pain à son père, bannis le chagrin de ton cœur Dieu t’aime. "
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486bba34079f7949f6c9f46",
      "auteur": "",
      "titre": "Du fond de l'abîme ",
      "corps": [
          {
              "type": "couplet",
              "content": "Du fond de l’abîme je t’invoque oh Éternel\n\nSeigneur écoute ma voix que ton oreille soit attentive \n(à la voix de mes supplications je t’invoque oh Éternel) \n "
          },
          {
              "type": "refrain",
              "content": "J’espère à l’Éternel mon Dieu, \nMon âme espère en lui, \nEt j’attends sa promesse, \nMon âme compte sur le seigneur"
          },
          {
              "type": "couplet",
              "content": "Si tu garder les souvenirs des iniquités\n(Seigneur qui pourrait subsister), \nEt le pardon se trouve auprès de toi, \n(Afin seigneur qu’on te craigne)."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486c0964079f7949f6c9f52",
      "auteur": "Frère Dudos ",
      "titre": "Ee Bwana ninaja kwako",
      "corps": [
          {
              "type": "couplet",
              "content": "Ee bwana ninaja kwako, \nMunyonge mimi naja kwako.\nTazama jisi ninavyo lemewa \nNa mzigo wa zambi zangu \n"
          },
          {
              "type": "couplet",
              "content": "Ulipo niona mimi \nNime potea ndipo kaanza, \nMbinu zakunitafuta mimi, \nNiliye kua mbali na mungu"
          },
          {
              "type": "refrain",
              "content": "Zambi zangu zote, \nNazi leta golgotha \nUnioshe Ee bwana, kama yule munyanganyi (neema hiyo nakuomba)"
          },
          {
              "type": "refrain",
              "content": "Wingi wazambi zangu, \nZina nilemea \nunioshe Ee bwana kama yule munyangani (nirizi ufalme wako)"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6484aa7a222f9b3a55d5ba04",
      "auteur": "",
      "titre": "En ce lieu",
      "corps": [
          {
              "type": "couplet",
              "content": "En ce lieu devant ta face\nOù nos cœurs trouvent l'esperence\nCombles-nous de ton' Esprit-Sant\nOuouohh Jésus en ce lieu"
          },
          {
              "type": "couplet",
              "content": "En ce lieu devant ta face\nOù nos cœurs trouvent l'esperence\nCombles-nous de ton' Esprit-Sant\nOuouohh Jésus en ce lieu"
          },
          {
              "type": "refrain",
              "content": "Esprit de Dieu, remplies ce lieu\nViens régner au milieu de nous\nViens nous apprendre à aimer Dieu\n\nPour que nous proclamions le salut de Jésus-Christ\nEsprit,travailles dans nos cœurs "
          }
      ],
      "__v": 0
  },
  {
      "_id": "64787b5796ac2d8e56dcaef5",
      "auteur": "Frère Raphael",
      "titre": "Et si mon âme",
      "corps": [
          {
              "type": "couplet",
              "content": "Si mon âme fonde à larmes \nSuite aux douleurs de la vie"
          },
          {
              "type": "bridge",
              "content": "Je sais que mon rédempteur est vivant"
          },
          {
              "type": "refrain",
              "content": "Mon sauveur dans sa largesse,\nIl m’embrasse dans toute ma tristesse. \nDans l’abondance de sa sagesse, \nRafraîchi mon âme dans toute sa sécheresse"
          },
          {
              "type": "couplet",
              "content": "Même si mon corps s'use \nEt les amis m'abandonnent \nC'est qui fait de moi un homme \nC'est l'éspérence en Dieu"
          },
          {
              "type": "couplet",
              "content": "Au dernier jour \nJe sais qu'il se lévera \nPour me ramasser \nDans ma profonde misère "
          },
          {
              "type": "refrain",
              "content": "Il est ma promesse \nTout le temps  de mon angoisse. \nC'est lui ma richesse \nTout le temps la pauvreté dans sa vitesse"
          },
          {
              "type": "refrain",
              "content": "Seigneur je t’adore, \nTon nom  je redore, \nTa présence me restaure, \nSeigneur je t’adore"
          },
          {
              "type": "couplet",
              "content": "Par ton sang ma vie est arrosée. \nJe suis devenu une rosée. \nQui est née de l’aurore. \nSuis devenu une rose"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6481ceeb6b5d0a602ad3db9b",
      "auteur": "Frères Dudos et Raph",
      "titre": "Eternel Dieu de gloire",
      "corps": [
          {
              "type": "couplet",
              "content": "Éternel Dieu de gloire nous voici devant toi, ressemblé comme un seul homme pour te célébrer,"
          },
          {
              "type": "refrain",
              "content": "Dans tes parvis seigneur inonde nos cœurs de joie, vient restaure nos vies guéris ton église, nous te louons Éternel, nous te chantons Éternel, nous t’exaltons oh Éternel."
          },
          {
              "type": "couplet",
              "content": "Nous te magnifions élevons ton nom toi le Dieu de notre salut soit adoré pour l’Éternel."
          }
      ],
      "__v": 0
  },
  {
      "_id": "64822f3989182d742cbdbd95",
      "auteur": "Frère Dudos ",
      "titre": "Eternel mon Roi",
      "corps": [
          {
              "type": "couplet",
              "content": "Éternel eh mon roi, me voici devant ta face pour t’adorer\n\nEternel eh mon roi, me voici devant ta face pour te louer\n"
          },
          {
              "type": "couplet",
              "content": "Et te chante un chant d’amour, \nPlein des gratitudes,\nPour tout ce que tu as fait dans ma vie, \nA jamais oh mon Dieu, \nJe n’ai t’oublierais, \nToi la source de mon salut mon cœur t’adore "
          },
          {
              "type": "refrain",
              "content": "Reçois l’adoration et la louange \nQui proviennent du fond de mon cœur, \nMon espérance et ma force c’est toi Jésus \nA jamais eh soit adoré "
          },
          {
              "type": "bridge",
              "content": "-Tu es digne(x3) o Seigneur,\n-Tu es le Roi (x3) o seigneur,\n-Nous te levons (x3) o seigneur,\n-Nous t’acclamons (x3) o seigneur.\n-reçois l’adoration et...\n"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6481d876688752b33c07267f",
      "auteur": "Frère Jimmy",
      "titre": "Every day",
      "corps": [
          {
              "type": "couplet",
              "content": "Every day to night, when everything arrest, I see the moon stars in heaven it shows your majesty, you are the king of kings the alpha and omega, your name is higher and higher we still believe in you.\n"
          },
          {
              "type": "couplet",
              "content": "Every day, every time, you are the only god, we still believe in you, we rise up hands we glorify your name, glory to your name.\n"
          },
          {
              "type": "refrain",
              "content": "You are wonderful, you are great full, you are power full I glorify your name\n\nI desire your presence, I desire to praise your name, fill me god, fill me god I want be like you."
          },
          {
              "type": "refrain",
              "content": "Tu es merveilleux, tu es le plus grand, tu es le tout puissant, je glorifie ton nom.\n"
          },
          {
              "type": "couplet",
              "content": "\nTu as soumis toutes les divinités, tu es le roi des rois, et ton règne c’est vraie na pas de fin, tu es merveilleux pour toujours. Nos mains levées nous contemplons ta splendeur, tu es le prince de vie, toi qui règne dans la justice, tu es merveilleux pour toujours"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486bed74079f7949f6c9f4f",
      "auteur": "",
      "titre": "Fanyiyeni Bwana shangwe",
      "corps": [
          {
              "type": "couplet",
              "content": "Fanyieni bwana shangwe dunia yote,\nMtumikie Bwana mungu kwa furaha kuu, \nNjoni mbele zake bwana kwa kuimba, \nJueni kwamba Bwana ndiye Mungu.\n"
          },
          {
              "type": "refrain",
              "content": "Mushukuruni lihimidini jina lake \nKwakua bwana ni mwema ni mwema siku zote, \nRehema zake niza milele milele \nNi mwaminifu kwa vizazi vyote"
          },
          {
              "type": "couplet",
              "content": "Yeye aliye tuumba nasi tuwake, \nWatu wake kondoo wa malisho yake, \nIngieni malangono kwaku shukuru \nNyumbani mwake Bwana kwaku msifu."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6482a2bcf693389bb4948d39",
      "auteur": "Frère Dudos",
      "titre": "Hata duniya i katae",
      "corps": [
          {
              "type": "couplet",
              "content": "Hata dunia ikatae, na wafalme wote wa katae  eh \n(nita ku popsifu)\nNita imba sifa zako, ewe Bwana mwokozi wangu\n(nita ku sifu)\n"
          },
          {
              "type": "refrain",
              "content": "Uliniumba kwa mfano wako, \nNita kusifu, \nUpendo wako wanijawa moyo, \nNina kusifu"
          },
          {
              "type": "bridge",
              "content": "Na ku sifu uh, na ku sifu, na ku sifu\nNa ku penda ah, na ku penda, na ku penda\nNa ku inua ah, na ku inua, na ku inua \n"
          }
      ],
      "__v": 0
  },
  {
      "_id": "647de6dc563515125ca54d2c",
      "auteur": "Frère Raphael",
      "titre": "Il m'a tant aimé",
      "corps": [
          {
              "type": "couplet",
              "content": "Il est mon bien aimé.\nAmi fidèle. \nQui peut me dire t’aime"
          },
          {
              "type": "couplet",
              "content": "il me ravive. \nJésus la source vive.\nEau de vie. \nQui donne essence à ma vie"
          },
          {
              "type": "refrain",
              "content": "Le lion de la tribut de Judas. \nEtoile du matin le rocher des âges. \nQui me dit à jamais je t’aimerais"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6481ce226b5d0a602ad3db88",
      "auteur": "Frère Dudos",
      "titre": "Il y a encore du temps",
      "corps": [
          {
              "type": "couplet",
              "content": "Il y a encore du temps pour tout recommencer,\nIl y a encore du temps rien n’est perdus, \nIl y a encore du temps pour être régénéré, Et faire un nouveau départ avec jésus"
          },
          {
              "type": "refrain",
              "content": "Il y a encore du temps pour tout recommencer,\nIl y a encore du temps rien n’est perdus, \nIl y a encore du temps pour être régénéré, Et faire un nouveau départ avec jésus"
          },
          {
              "type": "couplet",
              "content": "Vient mon frère (ma sœur) sa grâce est disponible, \nLe sang de l’agneau immolé \nEst là pour te rendre pur \nEt tu seras pardonné de tes péchés \nEt Jésus fera de toi sa demeure"
          },
          {
              "type": "refrain",
              "content": "Il y a encore du temps pour tout recommencer,\nIl y a encore du temps rien n’est perdus, \nIl y a encore du temps pour être régénéré, Et faire un nouveau départ avec jésus"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6481cb4b6b5d0a602ad3db7a",
      "auteur": "",
      "titre": "J'ai changé mon identité",
      "corps": [
          {
              "type": "couplet",
              "content": "J’ai changé mon identité, je ne suis plus d’ici bas j’ai changé, désormais je suis déclaré patriote de la nouvelle Jérusalem"
          },
          {
              "type": "refrain",
              "content": "Toute mon histoire a changé, Toute mon identité a changé, c’est ne plus moi qui vie, c’est alors le Christ en moi"
          },
          {
              "type": "refrain",
              "content": "Oh Jérusalem, nous chanterons à l’unisson notre cantique triomphal, hosanna à l’agneau de Dieu."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6482396889182d742cbdbda5",
      "auteur": "",
      "titre": "J'entends une douce mélodie ",
      "corps": [
          {
              "type": "couplet",
              "content": "J’entends une douce mélodie, \nQui traverse les airs de toutes parts, \n\nLes oiseaux des cieux la fredonnent, \nLes poissons des mers c’est la chuchote, \nLes animaux redisent le même refrain \nOui Jésus christ nous aime"
          },
          {
              "type": "refrain",
              "content": "Toutes ces créatures \nCélèbrent sa grandeur, \nSa puissance transparaît dans la magnificence de ses œuvres \nCréatures de Dieu \nFruit de son amour \nObjet de la fierté divine\n\n"
          },
          {
              "type": "couplet",
              "content": "La voix douce redit sa lassitude, \nC’est pour toi que le fils Dieu mourut, \nSur la croix il fût crucifié\nEt par sa mort la vie te le donne,\nEt que ses meurtrissures te donne la guérison\nOui Jésus christ nous aime."
          },
          {
              "type": "refrain",
              "content": "Entends-tu mon ami\nVette heureuse mélodie \nVeux-tu bien recevoir ce magnifique amour qu’il t’offre \net alors tu pourras te joindre à tous les saints,\nPour chanter le grand amour de jésus,\nAnnoncer le grand amour de jésus\nCélébrer le grand amour de jésus"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6482a143f693389bb4948d36",
      "auteur": "Frère Raphaël ",
      "titre": "Je prépare ma vie céleste ",
      "corps": [
          {
              "type": "couplet",
              "content": "Je prépare ma vie céleste, par ce voyage terrestre, car ma vie ici sur terre est semblable à la fleur, qui le matin fleuri et le soir flétri.\n\nPèlerin sur cette terre, moi je suis un passager, je ressens les douleurs du voyage et j’endure le labeur du voyage"
          },
          {
              "type": "couplet",
              "content": "Je voyage, auprès de mon père, je désire, revoir mon sauveur, mais j’éprouve beaucoup des contraintes, sur cette terre je suis pèlerin\n\nEt dans ce pèlerinage. Sur cette terre je voyage, le temps est orageux, je fais la roue et je prends courage"
          },
          {
              "type": "refrain",
              "content": "Passager, passager, pèlerin, pèlerin, je cours vers le but, je cours pour remporter le prix x3\n\nJe ne sais pas le chemin, seigneur montre moi le chemin, je ne sais pas la route, seigneur montre moi la route\n"
          },
          {
              "type": "bridge",
              "content": "Amène moi auprès de toi, là où les malheurs n’existent pas, \nAmène moi auprès de toi là où la les douleurs n’existent pas, \nAmène moi auprès de toi là où la peur n’existe plus x2 .\nAmène moi sur tes ailles auprès de toi dans la cité sainte, \nAmène moi sur tes ailles auprès de toi dans l’Éternité\n"
          }
      ],
      "__v": 0
  },
  {
      "_id": "648296a2f693389bb4948d22",
      "auteur": "Frère Jimmy ",
      "titre": "Jesus fils de Dieu",
      "corps": [
          {
              "type": "couplet",
              "content": "Jésus fils de Dieu descendit sur la terre \nPour te sauver, \nLui le Dieu très haut vêtus de la haire humaine\nPour te sauver"
          },
          {
              "type": "bridge",
              "content": "Il est né comme un homme il a vécu comme un homme \nPour te sauver (de la mort)"
          },
          {
              "type": "refrain",
              "content": "Il a été trahi par ses frères\nIl a été crucifié par ses frères\nAfin que s'accomplisse\n\n(Afin que s'accomplisse la prophétie)"
          },
          {
              "type": "couplet",
              "content": "Par jésus ma vie est blanchie, \nEn lui j’ai mon salut il m'a aimé, \nIl a payé ma rançon \nJe n’ai plus peur de rien il m'a sauvé"
          },
          {
              "type": "bridge",
              "content": "Par sa mort j’ai la vie \nSon sang m'a purifié de mes péchés eh\n(il m'a sauvé de la mort)"
          },
          {
              "type": "refrain",
              "content": "Il est le chemin,la vie, la vérité\nNull ne peut voir le père\nSans passer par lui\nEt moi je crois en lui\n\n(Et moi je crois en lui de tout mon cœur)"
          },
          {
              "type": "bridge",
              "content": "(il est vivant), \nIl est vivant \n(il est ressuscité),\nOh oh\n(jésus est vivant), \nIl est vivant, il est ressuscité"
          },
          {
              "type": "refrain",
              "content": "On l'a cloué, on la percé il na rien dit, \nIl est resté fidèle à sa mission jusqu’à la mort \n\nJésus a souffert pour mes péchés, \nOn l'a crucifié, il na rien dit"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6481cbf16b5d0a602ad3db7d",
      "auteur": "Frère Raphael",
      "titre": "Jesus la source vive",
      "corps": [
          {
              "type": "couplet",
              "content": "Jésus la source vive, vient me désaltérer, afin pour toi seul je vive de ta gloire nourris moi"
          },
          {
              "type": "couplet",
              "content": "Du Jourdain je suis la rive, toi l’amont je suis l’aval, jésus la source vive, lave moi de mon péché."
          },
          {
              "type": "couplet",
              "content": "Et quand l’orage gronde, et quand l’ouragan fait rage, soit pour moi une oasis, et une terre d’asile"
          },
          {
              "type": "refrain",
              "content": "Dans mes faiblesses et ma paraisse, rend moi plus vigoureux, dans mes douleurs et dans ma peur, rassure-moi, je te prie"
          },
          {
              "type": "refrain",
              "content": "Dans ma peur et mes douleurs, à Sion qu’afin j’arrive, oui, rassure moi toi le torrent intarissable"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486d55d5514806bc92767d4",
      "auteur": "Frère Dudos ",
      "titre": "Jesus my love ",
      "corps": [
          {
              "type": "couplet",
              "content": "Jesus my love, you are my life x2, you are the king of kings, I glorify your name x2, king of peace, lord of lords, you are my seviour"
          },
          {
              "type": "refrain",
              "content": "Jésus mon amour, tu es ma vie x2 tu es le roi des rois, je glorifie ton nom x2, prince de paix seigneur de seigneurs, tu es mon sauveur.    "
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486af004079f7949f6c9f27",
      "auteur": "",
      "titre": "Jour inoubliable ",
      "corps": [
          {
              "type": "couplet",
              "content": "Aujourd’hui c’est inoubliable jour, Dieu me donne la chaire de ma chaire, j’ai la joie de vivre avec toi mon amour toute ma vie toujours fidèle"
          },
          {
              "type": "couplet",
              "content": "Vous êtes témoins de cette union infinie, soit maudit ce lui qui mettra fin. Dans la joie la tristesse comme dans les malheurs je resterais toujours fidèle"
          },
          {
              "type": "refrain",
              "content": "Cette fleur je dois l’entretenir toute ma vie toute ma vie, cette fleur je dois la soutenir comme Jésus soutient l’église."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6482b238fbe1e96dbea6ed9a",
      "auteur": "",
      "titre": "Kati hekalu",
      "corps": [
          {
              "type": "couplet",
              "content": "Kati hekalu lako takatifu nita kwimbia bwana wangu siku zote. Kati hekalu lako takatifu nita ku sifu bwana wangu siku zote, Kati hekalu lako takatifu nita kwimbia wimbo wa sifa siku zote,\n\nNita kaa nyumbani mwako kwa ku sifu, kwa yote ume tenda maishani mwangu\n"
          },
          {
              "type": "refrain",
              "content": "Eh yahwe Jehovah jiré, Eh yahwe uinuliwe jina lako ushindi wangu.\nEh yahwe Jehovah nisi, Eh yahwe uinuliwe jina lako faraja wangu.\nEh yahwe Jehovah rapha, Eh yahwe uinuliwe jina lako ni nguvu yangu wangu\n"
          },
          {
              "type": "couplet",
              "content": "Bwana wangu nina kuomba, nifanye mimi mwana wako, niishi nyumbani mwako kama vile samueli, ili nami nionje, Baraka upendo na amani, niishi nyumbani mwako maishani mwangu mwote."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486b8984079f7949f6c9f3e",
      "auteur": "Frère Dudos",
      "titre": "L'amour de Dieu ",
      "corps": [
          {
              "type": "couplet",
              "content": "L’amour de Dieu pour toi et moi \nEst plus fort que celui des hommes\n\nIl m'a aimé dès le commencement, \nIl m'a choisi pour que je sois son fils\n\nJésus"
          },
          {
              "type": "refrain",
              "content": "Il m'a tant aimé Jésus hi hi, \nJusqu’à mourir pour moi sur la croix"
          },
          {
              "type": "refrain",
              "content": "Élevons son nom l’agneau immolé. Proclamons sa victoire le roi des rois \n\nPar ses plaies j’ai eu la vie et le salut gratuit quel grand amour\n\nMerci Jésus pour ton amour "
          }
      ],
      "__v": 0
  },
  {
      "_id": "6482b026fbe1e96dbea6ed6a",
      "auteur": "Frère Raphaël ",
      "titre": "La rédemption ",
      "corps": [
          {
              "type": "couplet",
              "content": "La rédemption, la rédemption, par le plan de la rédemption, \nNous sommes libérés, nous sommes affranchis, par le plan de la rédemption,\nL’Agneau immolé a tout expié eh nous voici tous libérés."
          },
          {
              "type": "bridge",
              "content": "Libérés, libérés nous chantons la vraie liberté, \nJustifiés, justifiés nous chantons la vraie liberté,\nPurifiés par le sang de lAgneau, nous chantons la vraie liberté\nPar ses meurtrissures sur les bois maudit, nous avons la vraie liberté"
          },
          {
              "type": "refrain",
              "content": "Libérés x4,\n(par le plan de la rédemption)\nJustifiés x4"
          },
          {
              "type": "couplet",
              "content": "Avant que le christ n’arrive \n(nous étions tous condamnés), \n\nIsraël en captivité \n(dans le pays de Babylone),\n\nUl se rappela de Zabulon \n(ils criaient à la liberté)"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6481de42688752b33c0728c2",
      "auteur": "Frère Jimmy ",
      "titre": "Le jour de ma détresse ",
      "corps": [
          {
              "type": "couplet",
              "content": "Le jour de ma détresse tu écoute mes prières, le jour de mes peines, tu te rapproche de moi, quand mes proches m’abandonnent, tu me dis ne crains rien,\n je serais avec toi tous les jours de ta vie,\nJe serais ton bouclier tous les jours de ta vie ne crains rien\n"
          },
          {
              "type": "couplet",
              "content": "Dans mes désespoirs,Seigneur tu me rassure, et dans mes peines, c’est toi mon compagnon, quand mes proches m’abandonnent, tu me dis ne crains rien,\nJe serais avec toi... \nDans ma faiblesse immense, ta force manifeste en moi, je ressens le goût de vivre, je me repose sous tes ailles tu me dis mon fils ne crains rien, ma source de joie c’est to"
          },
          {
              "type": "refrain",
              "content": "Mon seul espoir c’est toi, mon bouclier c’est toi, mon porte bonheur c’est toi, mon assurance c’est toi"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6481e768688752b33c072936",
      "auteur": "Frère Dudos",
      "titre": "Leve-toi",
      "corps": [
          {
              "type": "couplet",
              "content": "Lève-toi mon frère (ma sœur) et regarde, Comment les rimailles de Jérusalem sont détruites\n\nLève-toi mon frère (ma sœur) et regarde,\nComment les rimailles du Congo sont détruites\n\nOù est Néhémie dans ce pays, \nQu’il se lève pour rebâtir, \nCe beau pays et ce temple, \nLe Sion de notre Dieu où \nnonde sa gloire, \nEt son nom sera élevé à jamais"
          },
          {
              "type": "refrain",
              "content": "Que chacun apporte sa pierre pour reconstruire, \nCe temple, le Sion de notre Dieu\n\nQue chacun apporte sa pierre pour reconstruire, \nCe Congo, pour la gloire de notre Dieu"
          },
          {
              "type": "couplet",
              "content": "Lève-toi mon frère (ma sœur) et regarde, Comment les rimailles de Jérusalem sont détruites\n\nLève-toi mon frère (ma sœur) et regarde,\nComment les rimailles du Congo sont détruites\n\nJe me lèverais et j’irai vers les montagnes, \nEt j’apporterais du bois, \nEt j’en construirais ce temple, \nLe Sion de notre Dieu où inonde sa gloire, \nEt son nom sera élevé à jamais"
          }
      ],
      "__v": 0
  },
  {
      "_id": "648291bcf693389bb4948d15",
      "auteur": "",
      "titre": "Louez l'Éternel ",
      "corps": [
          {
              "type": "couplet",
              "content": "Louez l’Éternel car il est bon car sa miséricorde dure à toujours"
          },
          {
              "type": "couplet",
              "content": "Ainsi disent les rachetés de l’Éternel ceux qu’il a délivrés de la main de l’ennemi"
          },
          {
              "type": "couplet",
              "content": "L’Éternel est élevé au-dessus de toutes les nations sa gloire est au-dessus des cieux."
          },
          {
              "type": "bridge",
              "content": "Et qui est semblable à l’Éternel notre Dieu il a sa demeure là en haut il rabaisse son regard sur la terre.\n"
          },
          {
              "type": "refrain",
              "content": "Éleve-toi sur les cieux o Dieu et que ta gloire soit sur toute la terre ton œuvre n’est que splendeur magnificence et ta justice subsiste à jamais"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6481e9a1688752b33c072939",
      "auteur": "Frère Raphaël",
      "titre": "Louons-le",
      "corps": [
          {
              "type": "couplet",
              "content": "Louons-le, selon l’immensité de sa grandeur, célébrons-le, il est notre créateur, élevons-le, lui qui nous donne le bonheur, adorons-le, il a mis fin à notre malheur"
          },
          {
              "type": "couplet",
              "content": "Il est le roi, le Dieu de notre salut, il mérite, la louange de nos bouches à jamais, à jamais"
          },
          {
              "type": "bridge",
              "content": "Mon âme loue l’Éternel et n’oublie aucun de ses hauts faits, du griefs du lion il ta arraché, comme dans la maigreur de ton espoir, lorsque tout ta semblé perdus, et le monde ta paru étrange, il est venu sécher les torrents de larmes qui coulait de tes yeux, il a fait de toi une nouvelle créature, il a fait de toi un homme. "
          },
          {
              "type": "refrain",
              "content": "Venez venez mes frères, venez mes sœurs, tous les chrétiens du monde, venez oh uh oh, et louons l’Éternel il est incomparable, ses hauts faits nous dépassent, il est le créateur\n-oh oh le roi,(x3) nous te louons\n-...nous t’adorons\n-...nous t'acclamons"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6482363d89182d742cbdbda0",
      "auteur": "Frère Dudos",
      "titre": "Ma mission ",
      "corps": [
          {
              "type": "couplet",
              "content": "Uh, uh uh uh  uh(x4)\nComme tu m'as envoyé dans le monde, \nMoi aussi je les envoie dans le monde "
          },
          {
              "type": "couplet",
              "content": "Nous somme envoyé \nDans le monde \nPour prolonger la mission \nDe notre seigneur Jésus \nMontrer le chemin \nDu salut aux autres \nAfin que nous rendions vivantes \nLes âmes mortes ouh ouh ouh ouh ouh ouh"
          },
          {
              "type": "couplet",
              "content": "Nous avons été conçus pour \nAccomplir une mission, \nJe dois aller jusqu’au bout, \nDe ma mission, \nEt achever la tache \nQue ma conféré le seigneur Jésus."
          },
          {
              "type": "refrain",
              "content": "Je veux faire de toutes les nations des disciples, \nLes baptisant au nom du père du fils et du saint esprit, \nEt leur enseigner à observer tous ce que, ma prescrit mon seigneur Jésus christ ou oh ou oh ouh ou oh ou oh"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486de789aa61ce3ad0610aa",
      "auteur": "",
      "titre": "Maisha bila Yesu",
      "corps": [
          {
              "type": "couplet",
              "content": "Maisha bila yesu \nHayana faida ewe mwanadamu, \nKumbuka yesu alivyo teswa, \nKwa ajili ya zambi zako, \nHaya yote alivumilia, \nIli wewe nami tu okolewe\n"
          },
          {
              "type": "refrain",
              "content": "Sija pata mwengine kama yesu, \nEh ewe Elshadai ukae ndani yangu \n\nIli moyo wangu utulie, \nNipate kuishi na amani, \nBila wewe mimi sina raha,\nIli moyo wangu utulie, \nNipate kuishi na amani,\npamoja nawe mimi nina raha."
          },
          {
              "type": "couplet",
              "content": "Kumbuka Bwana yesu musalabani, \nAlivyo teswa \nKwa nini mwanadamu una mwasi Mungu "
          },
          {
              "type": "type",
              "content": ""
          }
      ],
      "__v": 0
  },
  {
      "_id": "64829281f693389bb4948d18",
      "auteur": "Frère Raphaël ",
      "titre": "Merci Seigneur ",
      "corps": [
          {
              "type": "couplet",
              "content": "Dans ta présence me voici seigneur pour te dire merci pour tout\n\nJe lève mes mains pour te dire merci merci seigneur pour tout"
          },
          {
              "type": "refrain",
              "content": "I raise my hands to worship you I say thank you for all\n\nFor the rest for health for the lame of god I say thank you for all\n\nI could die in my sins but you saved me I say thank you for all\n\nDidn’t have any hop at all you coved me I say thank you for all\n\nEven thought I cant forget your love for me I say thank you for all."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486c14d4079f7949f6c9f55",
      "auteur": "",
      "titre": "Mimi msafiri",
      "corps": [
          {
              "type": "couplet",
              "content": "Ni msafiri hapa duniani kweli (uniongoze safarini mwangu), na safiri kwenda mbinguni huko (uniongoze safarini mwangu),"
          },
          {
              "type": "couplet",
              "content": "Giza kuu hapa duniani kweli (uniongoze safarini mwangu), michongomwa visiki njiani humo (uniongoze safarini mwangu),"
          },
          {
              "type": "refrain",
              "content": "Bwana wangu bwana, (Bwana wangu) uniongoze, uniongoze bwana (uniongoze,) uniongoze safarini mwangu"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486e4ea9aa61ce3ad061142",
      "auteur": "",
      "titre": "Muke mwema ",
      "corps": [
          {
              "type": "refrain",
              "content": "Urizi na mali mutu huvipata kwa babaye lakini muke mwema hutoka kwa Mungu\n\nTwa shangilia ushindi huu, sababu ujana nikipindi nzito, jiunge nasi tushangilie "
          },
          {
              "type": "bridge",
              "content": "Muwaachie vijana uhuru wakuchagua, musimukaze mutu kupenda mwengine upendo wakweli watoka rohoni"
          },
          {
              "type": "couplet",
              "content": "Jameni leo nishangwe kuu (ni shangwe) kuona vijana wame funga ndoa (wameshinda ujana)\n\nKatolika (Fulani) hakumupata muke huu  aumonerie Fulani amemupata muke (huh u)"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486a6e89c00c00d5cccc6d2",
      "auteur": "",
      "titre": "Na shangaa sana",
      "corps": [
          {
              "type": "couplet",
              "content": "Na shangaa sana kwa pendo lake yesu, Ameniokoa eh toka zambi zangu, \nKwa damu yake leo mimi nime wekwa huru kabisa\n\nNa shangaa sana \n(Kwa pendo lake yesu) \nAmeniokoa eh \n(Toka zambi zangu) \nKwa damu yake leo \n(Mimi nime wekwa huru kabisa)"
          },
          {
              "type": "refrain",
              "content": "kweli bwanani mwenye rehema \nAmenitendea ajabu kabisa, \nSita mwacha kwa maisha yangu \nNita mwimbia pendo langu aayee"
          },
          {
              "type": "couplet",
              "content": "Ame nipenda sana ameniokoa eh, \nNa nita mu fuata yesu maisha yangu yote, \nNa nita mwimbia eh alleluia hozana asifiwe\n\nAme nipenda sana \n(Ameniokoa eh)\nNita mu fuata yesu \n(Maisha yangu yote)\nNa nita mwimbia eh \n(Alleluia hozana asifiwe)"
          },
          {
              "type": "refrain",
              "content": "Bwana ni upendo yeyeye yeye\nTena rehema\nRehema yeyeye\n\nTena reheme\nRehema yeyeye"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486b4f94079f7949f6c9f38",
      "auteur": "",
      "titre": "Nita li inuwa jina lako",
      "corps": [
          {
              "type": "couplet",
              "content": "Nita liinuwa jina lako bwana, \nNita ku himidi Yesu, \nKwa miujiza ume nitendea, \nNinapo tazama tangu kuzaliwa kwangu \nMpaka leo ni neema yako"
          },
          {
              "type": "refrain",
              "content": "Nitazamapo mahali nina toka \nNa mahali nilipo sasa, \nNina shindwa kuelewa \nUkuu wako bwana"
          },
          {
              "type": "couplet",
              "content": "Nasema asante tena kwako eh mungu \nKwaku twanzisha mwaka huu mupya, \nTwa ua nza pia na matatizo oh, \nLakini hakuna kitu ambacho kitatutisha \nKwani we mungu mlinzi wetu"
          },
          {
              "type": "refrain",
              "content": "Mwaka ulio pita nilikumbwa na shida, \nMatatizo mateso mengi, \nLakini ewe Mungu kwa hayo yote \nUlitutia moyo na utulivu\n\nTwa sema asante kwa ulinzi wako Bwana \nJina lako bwana libarikiwe"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486db4b9aa61ce3ad061046",
      "auteur": "",
      "titre": "Nita lisifu",
      "corps": [
          {
              "type": "couplet",
              "content": "Nitalisifu jina lako bwana wangu, kutangaza ushindi wako mahali pote\n\nHata mbele ya myungu mingine nita tangaza uko mungu, dunia nzima ijue kwamba uko mungu"
          },
          {
              "type": "couplet",
              "content": "nita inua jina lako bwana wangu, kushuhudia ushindi wako nyakati zote\n\nHata wafamlme wa dunia wakukatae nita tangaza dunia nzima ijue kwamba uko mungu\n"
          },
          {
              "type": "refrain",
              "content": "Dunia nzima ijue kwamba wewe ndiwe mungu asiye shindwa \nAliye shusha moto wakati wa elia, naku ya gawanya maji wakati wa musa, aliye fufua dorika wakati wa petro, anaye ya pigania maisha yetu \n\nUinuliwe uinuliwe milele, hubadiliki wabaki mungu daima\n"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486c2f54079f7949f6c9f58",
      "auteur": "Frère Dudos",
      "titre": "Njoni tu mu sifu Bwana",
      "corps": [
          {
              "type": "couplet",
              "content": "Njoni tumusifu bwana,\nTutape ukuu wake  \nKwani mbingu nayo inchi ya jaa sifa zake Alituumba kwamfano wake \nIli tumutumikie \nPeke yake astahili, sifa zamidomo yake"
          },
          {
              "type": "refrain",
              "content": "Jehovah mungu wa israel,\nTunashuka mbele yako twakusujudia wewe\nTuna tangaza ushindi wako musalabani dunia nzima ikujue wewe, \nKu pitia sisi vyombo vya sifa zako"
          },
          {
              "type": "refrain",
              "content": "Uwabudiwe Bwana ah \nUpendo wako niwa ajabu kwetu\nUsujudiwe Bwana ah, \nUpendo wako niwa ajabu kwetu.\nPokea sifa Bwana ah\nUpendo wako ni wa ajabu kwetu\nUinuliwe Bwana ah\nUpendo wako ni wa ajabu kwetu "
          },
          {
              "type": "couplet",
              "content": "Yesu yeye ni yote katika yote\nMwamba wa wote, muumba wa vyote, \nKimbilio la vizazi vyote wakati wote eh eh\n(anastahili sifa siku zote)."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6482a76ff693389bb4948d45",
      "auteur": "",
      "titre": "Nous te louons Jésus ",
      "corps": [
          {
              "type": "couplet",
              "content": "Nous te louons Jésus, nous t’exaltons oh Dieu,\nPour toute ta bonté \nEt pour toute ta gloire, \nTu nous a tous protégés, tu es notre bouclier,\nNous te louons Jésus \nReçois nos  louanges"
          },
          {
              "type": "refrain",
              "content": "Sanctifié sois-tu Dieu, \nCar nos ennemis tu les a confondus, \nEt pour toute ta gloire, \nReçois nos louanges "
          },
          {
              "type": "couplet",
              "content": "Aie pitié des orphelins, aie pitié des déplacés,\nAie pitié de tes enfants,\nProtège ton église, \nDonnes-nous l’espérance, donnes nous l’unité,\nMalgré nos faiblesses, \nEcoute nos prières."
          }
      ],
      "__v": 0
  },
  {
      "_id": "64829302f693389bb4948d1b",
      "auteur": "Frère Dudos ",
      "titre": "Nous voici",
      "corps": [
          {
              "type": "couplet",
              "content": "Seigneur nous voici, devant ton trône de grâce\n\nNous adorons oh ton saint nom devant ton trône de grâce"
          },
          {
              "type": "refrain",
              "content": "Tu as écrasé l’orgueil des princes de ce monde, tu as détruit nos ennemis et tu nous a libéré toi qui règne dans la louange et l’adoration de ton peuple soit adoré à jamais o roi des roi."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6481ceac6b5d0a602ad3db8b",
      "auteur": "Frère Dudos",
      "titre": "Nous voici en Jérusalem",
      "corps": [
          {
              "type": "couplet",
              "content": "seigneur nous voici en Jérusalem, selon tes promesse nous sommes réunis, nous voulons être tes témoins dans le monde"
          },
          {
              "type": "couplet",
              "content": "Esprit des miracles esprit de force, nous -voulons marcher avec toi tous les jours\n…nous voulons chanter avec toi tous les jours\n…nous voulons prêcher avec toi tous les jours "
          },
          {
              "type": "refrain",
              "content": "Sans ton esprit nous ne pouvons rien envoie esprit saint esprit de force.\nVient esprit de Dieu, vient souffle un vent nouveau, \nVient et remplie ton église de ta puissance o esprit de Dieu vient sur nous."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486b6024079f7949f6c9f3b",
      "auteur": "",
      "titre": "O Dieu, ne reste pas",
      "corps": [
          {
              "type": "couplet",
              "content": "O Dieu ne reste pas dans les silences, ne te tais pas et ne te repose pas O Dieu car voici tes ennemis s’agitent, ceux qui te haïssent lèvent la tête, ils forment contre ton peuple des projets plein des ruses et ils délibèrent contre ceux que tu protège"
          },
          {
              "type": "couplet",
              "content": "Couvre leurs faces d’ignominie, afin qu’ils cherchent ton nom O Éternel, qu’ils soient confus et épouvantés pour toujours, qu’ils soient honteux et qu’ils périssent, qu’ils sachent que toi seul dont le nom et l’Éternel, tu es le très haut sur toute la terre"
          },
          {
              "type": "refrain",
              "content": "Tu es le seul Dieu tout puissant ah ah, ta miséricorde dure à jamais\n\nA jamais eh eh eh."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6482adabfbe1e96dbea6ed00",
      "auteur": "",
      "titre": "Pale ambapo",
      "corps": [
          {
              "type": "couplet",
              "content": "Pale ambapo akili zangu zaishia, \nNdipo zako zaanzia\nMatendo yako bwana yapita, \nFahamu za wanadamu\n"
          },
          {
              "type": "refrain",
              "content": "Katika unyonge wangu mimi \nNdipo nguvu zako bwana, \nZinapo onekana ndani yangu, \nNeema yako yani tosha."
          },
          {
              "type": "couplet",
              "content": "Pale ambapo nguvu zangu zaanzia. \nNdipo wewe unatenda\nPale ambapo watu wana nicheka, \nNdipo wa  nipa ushindi."
          },
          {
              "type": "bridge",
              "content": "Neema yako ya ni tosha \n(katika shida)\nNeema yako ya ni tosha \n(katika tabu)"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6482316689182d742cbdbd98",
      "auteur": "Frère Dudos ",
      "titre": "Pokeya sifa",
      "corps": [
          {
              "type": "bridge",
              "content": "Pokea sifa na heshima, \nWewe ndiwe mungu muumbaji, \nMbingu na yo inchi pia nyota, \nNi kazi ya mikono yako mungu"
          },
          {
              "type": "bridge",
              "content": "Yako mungu uli tuumba \nKwa mufano wako oh oh oh oh, \nUka tu tofautisha na wa nyama ah ah, \nAcha tu ku sifu\n"
          },
          {
              "type": "refrain",
              "content": "Acha tu ku abidi, wewe wa stahili, ku abudiwa na viumbe vyote, Bwana\n\nAcha tu kuinue, wewe wa stahili, ku inuliwa na viulbe vyote, Bwana\n"
          },
          {
              "type": "couplet",
              "content": "Kama Miriamu uh uh \nAlivyo kuusifu, \nWa lipo ivuka ah ah, \nBahari ya shamu (x2), \nNdivyo hivyo nasi, \nTwa ku sifu Ee Ee Ee bwana "
          }
      ],
      "__v": 0
  },
  {
      "_id": "6481dde5688752b33c0726d3",
      "auteur": "Frère Dudos",
      "titre": "Poussons les cris de joie",
      "corps": [
          {
              "type": "couplet",
              "content": "Poussons les cris de joie \nA Jésus notre sauveur,\nIl a vaincu la mort \nLe sauveur de nos cœurs\n"
          },
          {
              "type": "refrain",
              "content": "Par sa mort nous avons \nLa vie et le bonheur, \nIl a établi \nSon règne dans nos cœurs,\nDans nos cœurs, dans nos cœurs"
          },
          {
              "type": "couplet",
              "content": "Il n‘est plus dans le tombeau, \nIl est réussite, \nTous les chrétiens du monde, \nCélèbre sa victoire, \nQue le sceptre de sa gloire \nSoit élevé à jamais, \nA jamais eh à jamais\n"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486b2784079f7949f6c9f35",
      "auteur": "",
      "titre": "Quand Jésus fut baptisé ",
      "corps": [
          {
              "type": "couplet",
              "content": "Quand Jésus fut baptisé dans les eaux de jourdain \nPar l’envoyé de Dieu Jean-Baptiste, \nUne voix retentit dans le ciel qui déclara,\nCelui-ci est mon fils mon bien-aimé\n"
          },
          {
              "type": "refrain",
              "content": "Qui as témoigné pour toi, \nQui témoigne, \nQui témoignera pour toi \nLors de ton baptême\n\nDieu connaît ses brebis\nEt ses brebis entendent sa voix\nQui les appelle "
          },
          {
              "type": "couplet",
              "content": "Le baptême mon frère Pour ceux qui croient \nQui sont purifiés par le sang de l’agneau, \nLe baptême est un signe de croyance à la parole de Dieu \nCombas les bons combats de la foi"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6482984cf693389bb4948d27",
      "auteur": "Frère Jimmy ",
      "titre": "Roho, nafsi",
      "corps": [
          {
              "type": "couplet",
              "content": "Roho, nafsi mwili pia \nVi endeleye ku geuzwa na wewe kwa uwezo wa roho mutakatifu, \nRoho yangu, nafsi yangu, mwili pia \nViendelee ku geuzwa na wewe kwa uwezo wa roho mutakatifu"
          },
          {
              "type": "refrain",
              "content": "Bwana uya ongoze maisha yangu, \nBwana unipe kuku penda"
          },
          {
              "type": "couplet",
              "content": "Mawazo yangu, matendo yangu, \nVi endeleye kugeuzwa na wewe kwa uwezo wa roho mutakatifu"
          },
          {
              "type": "refrain",
              "content": "Bwana nieleweshe mateso yako, \nBwana unipe kuvundjika"
          },
          {
              "type": "bridge",
              "content": "Neno lako liwe taa Kwa miguu yangu, \nNa nuru kwa njia zangu, \nNi baki nyumbani mwako siku zote,\nNikutumikie"
          },
          {
              "type": "couplet",
              "content": "Roho, nafsi mwili pia \nVi endeleye ku geuzwa na wewe kwa uwezo wa roho mutakatifu, \nRoho yangu, nafsi yangu, mwili pia \nViendelee ku geuzwa na wewe kwa uwezo wa roho mutakatifu"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6481de33688752b33c07285d",
      "auteur": "Frère Dudos",
      "titre": "Sifa ni zako",
      "corps": [
          {
              "type": "couplet",
              "content": "Sifa ni zako \nUtukufu ni wako,"
          },
          {
              "type": "bridge",
              "content": "Ulitupenda uupendo wa ajabu, \nkamutoa mwana wako wa pekee,\nIli afe musalabani atuokoe,\nkwa furaha ya wokovu twa shangilia"
          },
          {
              "type": "refrain",
              "content": "U inuliwe Bwana na viumbe vyote duniani,\nU abudiwe Bwana na viumbe vyote duniani\nU sujudiwe Bwana na viumbe vyote duniani\nU shangiliwe Bwana na viumbe vyote duniani"
          },
          {
              "type": "couplet",
              "content": "Ee Bwana Mungu wangu\nMuumbaji wa mbingu na inchi\nUtukufu wako wa jaza dunia\nMambo unayo ya tenda \nMaishani mwangu\nYapita fahamu \nAcha ni ku abudu\n\n\nUli kubali ku towa\nMwana wako wa pekee\nAfe msalabani a tu okowe\nYesu, Yesu \nMwokozi wangu acha ni ku abudu"
          },
          {
              "type": "bridge",
              "content": "Ulitupenda uupendo wa ajabu, \nkamutoa mwana wako wa pekee,\nIli afe musalabani atuokoe,\nkwa furaha ya wokovu twa shangilia"
          },
          {
              "type": "refrain",
              "content": "U inuliwe Bwana na viumbe vyote duniani,\nU abudiwe Bwana na viumbe vyote duniani\nU sujudiwe Bwana na viumbe vyote duniani\nU shangiliwe Bwana na viumbe vyote duniani"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486e59b9aa61ce3ad061145",
      "auteur": "",
      "titre": "Simameni tu msifu Bwana",
      "corps": [
          {
              "type": "couplet",
              "content": "Taifa la bwana simameni tumusifu bwana, tumwimbie wimbo wa sayuni"
          },
          {
              "type": "refrain",
              "content": "Vigele gele he he sifa kwa mungu wetu, vigele gele he he sifa siku zote, vigele gele he he sifa hakuna kama yeye."
          },
          {
              "type": "couplet",
              "content": "Mungu ame tenda mambo ya ajabu katika maisha yetu ndugu yangu          -ametupa uhai wake leo (bure)\n-Ametulinda toka zambi (bure)"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6481cf626b5d0a602ad3dbc9",
      "auteur": "Frère Raphael",
      "titre": "Sous le soleil",
      "corps": [
          {
              "type": "couplet",
              "content": "sous le soleil tous que tu peut faire autant courir après le vent, le soleil de l’orient se lève et à l’occident il se couche, et les hommes passent rien ne demeure, sous le soleil rien ne vie plus d’un jour"
          },
          {
              "type": "couplet",
              "content": "Tend moi ta main seigneur ma vie comme l’aigle qui vole, apprend moi la sagesse pour un choix rationnel, de mon sort je n’en sais rien seigneur je me confie en toi"
          },
          {
              "type": "refrain",
              "content": "Vanité des vanités sous le soleil tous est dérisoire, de l’amour, de la haine, sous le soleil je ne sais pas mon sort."
          },
          {
              "type": "bridge",
              "content": "Ce que je veux seigneur"
          },
          {
              "type": "refrain",
              "content": "Je veux t’aimer te tout mon cœur, je veux t’aimer de toute "
          },
          {
              "type": "refrain",
              "content": "mon âme. Et à toi seul seigneur, je veux rendre un culte, car sous le soleil, tous ce qui y est  vanité."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6482a032f693389bb4948d33",
      "auteur": "Frère Raphaël ",
      "titre": "Toutes les voies de Dieu ",
      "corps": [
          {
              "type": "couplet",
              "content": "Toutes les voies de Dieu, sont bonté et fidélité, \nPour ceux qui suivent toutes les règles de son alliance"
          },
          {
              "type": "refrain",
              "content": "Ils restent juste \nDans sa justice \nEnvers leur justesse, \nIl les fait vivre \nEt leur montre \nLe chemin à suivre. \nIl leur dit:\nRestez en silence \nEt faites moi confiance"
          },
          {
              "type": "bridge",
              "content": "Leur salaire x3, \nC’est ce que l’œil n’a jamais vu\n\nCe que l’œil na jamais vu \nEt l’oreille jamais entendu, \nL’esprit de l’homme jamais soupçonné, \nC’est la part de ceux qui le craignent.\n"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486bc964079f7949f6c9f49",
      "auteur": "",
      "titre": "Toutes mes sources ",
      "corps": [
          {
              "type": "couplet",
              "content": "Toutes mes sources sont en toi, \nTu me réjouis dans ta présence, \nMon âme a soif de toi, \nMon cœur soupire après toi, \nDans le désert trop brûlant de silence. \n\nToutes mes sources sont en toi, \nTu me réjouis dans ta présence, \nMon âme espère en toi, \nTu es mon abri tu es mon assurance, "
          },
          {
              "type": "refrain",
              "content": "Dieu tout puissant, Seigneur mon maître\nAmi fidèle tendre père mon berger, \nAmour si grand qui remplit mon être \nDu bonheur de pouvoir te rencontrer."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6482a38ff693389bb4948d3c",
      "auteur": "Frère Dudos ",
      "titre": "Tu es digne ",
      "corps": [
          {
              "type": "couplet",
              "content": "Tu es Dieu digne de louange, ton nom est adoré parmi les anges et tous les humains toi le rocher des âges"
          },
          {
              "type": "refrain",
              "content": "Majesté eh o roi vit pour toujours o Dieu de gloire règne,\nMon sauveur eh, oh roi vit pour toujours oh Dieu de gloire règne\nDans mon cœur dans ma vie\n\nMajesté eh oh roi vit pour toujours oh Dieu de gloire règne \nMon sauveur eh, oh roi vit pour toujours oh Dieu de gloire règne à jamais\n"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6481dbc1688752b33c072687",
      "auteur": "Frère Jimmy ",
      "titre": "Tu peux courir ",
      "corps": [
          {
              "type": "couplet",
              "content": "Tu peux courir ça et là partir à la recherche du bonheur\n\nMais le monde passe avec ses convoitises \n\nTu peux courir ça et là partir à la recherche de la gloire\n\nMais le monde passe avec ses convoitises \n\nTu peux même vivre le bonheur sans te souciez de ton créateur\n\nMais le monde passe avec ses convoitises."
          },
          {
              "type": "refrain",
              "content": "Ne vous souciez pas du bonheur de ce monde, Mais vivez comme Dieu vous le demande, \nIl n’y a pas le vrai bonheur sur la terre, \nLe vrai bonheur demeure en Jésus christ"
          },
          {
              "type": "couplet",
              "content": "Écoute mon frère, tu n’es point de ce monde, Ta vie sur terre c’est comme un long voyage, Le chemin est pénible et plein des tentations, Il te faut marcher, il te faut du courage,\n"
          },
          {
              "type": "couplet",
              "content": "N’aimez point le monde ni le plaisir du monde, Car le monde passe avec ses convoitises.\n"
          },
          {
              "type": "refrain",
              "content": "Tu peux courir ça et là partir à la recherche du bonheur\n\nMais le monde passe avec ses convoitises \n\nTu peux courir ça et là partir à la recherche de la gloire\n\nMais le monde passe avec ses convoitises \n\nTu peux même vivre le bonheur sans te souciez de ton créateur\n\nMais le monde passe avec ses convoitises."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6481e375688752b33c072930",
      "auteur": "Frère Jimmy ",
      "titre": "U abudiwe",
      "corps": [
          {
              "type": "couplet",
              "content": "Uabudiwe, \nUinuliwe, \nU sujudiwe eh bwana milele"
          },
          {
              "type": "couplet",
              "content": "Twainua mimono yetu kulisifu Jina lako, \nTwa shuka kwa ma goti kutangaza ukubwa wako."
          },
          {
              "type": "couplet",
              "content": "Hakika wewe ni bwana \nWa stahili kuabudiwa, \nMbingu nazo inchi \nNi kazi ya mikono yako, \nUtukufu Sifa na heshima vyote ni vyako(x2) \nAcha ni kwa budu"
          },
          {
              "type": "refrain",
              "content": "Acha nikuabudu, \nAcha niku inuwe, \nAcha niku imbie wewe, \nNili inuwe jina lako, \nSifa zote ni zako, \nU inuliwe milele na milele"
          },
          {
              "type": "couplet",
              "content": "Ni somapo maandiko, na ona kwamba wewe, Ni mungu wa miungu na viumbe vyote, \nHauna mwanzo wala mwisho wa maisha ya ako, \nUinuliwe milele na milele"
          },
          {
              "type": "couplet",
              "content": "wewe ni alpha \nTena omega \nUinuliwe milele na milele"
          },
          {
              "type": "couplet",
              "content": "Les 24 vieillards se prosternent devant toi, et disent que tu es digne de recevoir, l’honneur et la gloire, et nous qui sommes sur terre, nous élevons nos voix, vers toi père, vers toi Jésus, reçois nos louanges"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486bdb54079f7949f6c9f4c",
      "auteur": "Frère Dudos",
      "titre": "U ni badilishe Bwana",
      "corps": [
          {
              "type": "refrain",
              "content": "Unibadilishe bwana na neno lako nisi ondoke kanisani kama vile nilivyo ingia x2, niongoze bwana na safarini mwangu, natakatu nibadilishwe na wewe"
          },
          {
              "type": "bridge",
              "content": "maubiri yaubiriwa hazarani kaka(dada) yangu kusudi la mungu ili wewe ubadilike x2, kwanini baba (mama) hutaki kubadilika, nibadilishe yesu oh mungu wangu natakatu kubadilishwa na wewe x2"
          },
          {
              "type": "couplet",
              "content": "Ee mungu wa upendo na mwenye rehema tele unisaidie nisi anguke tena x2, shetani wewe nasitaki tena kukufuata tena, mungu wangu muondoe mbali nami x2, nisaidie yesu eh mungu natakatu nibadilishwe na wewe x2."
          },
          {
              "type": "refrain",
              "content": "Maombi yangu yawekwe kama uvumba mbele yako, uchunge mulango wa midomo yangu, usi sukume moyo wangu kwa kitu kibaya x2.\nMacho yangu ni kwakotu, Ee mungu baba nakutumainia wewe usiache nafsi yangu x3"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486d7575514806bc92767db",
      "auteur": "",
      "titre": "Uli acha utukufu",
      "corps": [
          {
              "type": "couplet",
              "content": "Uliacha utukufu na heshima juu mbinguni\nUka shuka duniani twasema\n(asante bwana), \nUkazarauliwa nakuya vumilia \nMateso ili mimi niokolewe  \n(asante bwana) \nKachukua laana zangu na zambi zangu zote\nNisemenini mimi hi hi  \n(asante bwana)\n\n"
          },
          {
              "type": "refrain",
              "content": "Wewe wa stahili\nKu abudiwa nami\nWewe wa stahili\nKu shukuriwa nami\nWewe wa stahili\nKu inuliwa nami"
          },
          {
              "type": "couplet",
              "content": "Ninapo tazama mambo unayo tenda \nMaishani mwangu na sema  \n(asante bwana), \nWewe una nilinda usiku na muchana \nNiseme nini mimi hihi, \n(asante bwana)\nWaongoza mi guu yangu katika njia zote\nWaniandalia meza mbele ya adui zangu nasema  \n(asante bwana)"
          },
          {
              "type": "bridge",
              "content": "U abudiwe mwamba milele \n(U abudiwe bwana)\nU inuliwe mwamba milele he \n(u inuliwe bwana)\nU sujudiwe mwamba milele he \n(u sujudiwe bwana)"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6482a528f693389bb4948d3f",
      "auteur": "Frère Jimmy ",
      "titre": "Viens Seigneur ",
      "corps": [
          {
              "type": "couplet",
              "content": "Viens seigneur, viens Jésus, viens Esprit remplie ce lieu \n\nNous voici devant toi, pour célébrer ta gloire Jésus, \nReçois l’adoration, \nReçois louange Jésus, \nTu as vaincu la mort.\n"
          },
          {
              "type": "couplet",
              "content": "Onction de Dieu, Esprit divin, règne au milieu de nous, \nSouffle sur tes enfants prosternés devant toi pour t’adorer."
          },
          {
              "type": "couplet",
              "content": "Remplie ce lieu de ta présence, \nNous voulons te suivre, \nL’honneur la puissance et la gloire t’appartiennent eh eh eh, \nL’honneur la puissance et la gloire t'appartiennent "
          },
          {
              "type": "refrain",
              "content": "Viens Esprit de Dieu, \nRemplie nos vies de ta puissance et ta force et ta gloire "
          },
          {
              "type": "bridge",
              "content": "Onction de Dieu, esprit divin souffle sur nous"
          }
      ],
      "__v": 0
  },
  {
      "_id": "64829b02f693389bb4948d2b",
      "auteur": "Frère Raphaël ",
      "titre": "Viens consoler",
      "corps": [
          {
              "type": "couplet",
              "content": "Seigneur mon Cœur est lourd, mon ciel est noir et le monde plein d’ombres. "
          },
          {
              "type": "refrain",
              "content": "Viens consoler nos âmes brisées, \nViens consoler nos âmes fatiguées, \nViens consoler nos âmes déchirées."
          },
          {
              "type": "couplet",
              "content": "Sers-moi contre ton cœur, Je t’ouvre mon cœur pour une vie sans terreur"
          },
          {
              "type": "bridge",
              "content": "Marches à ma présence colonne de feu:\nDu lever du soleil jusqu’à son coucher eh\n\nMarches à ma présence colonne de nuée :\nChaque jour qui se lève chaque nuit qui vient\n"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486dc709aa61ce3ad061085",
      "auteur": "",
      "titre": "Viumbe vyote",
      "corps": [
          {
              "type": "couplet",
              "content": "Viumbe vyote vya tangaza ya kwamba (hakuna kama wewe), waimbaji nao wasema ah ah, (hakuna kama wewe), dunia nzima ya shuudia ya kwamba (hakuna kama wewe),"
          },
          {
              "type": "refrain",
              "content": "Basi nakila mwenye, mwenye pumzi x2\nAmusifu bwana hallelui"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6482c9ac26a14992db159674",
      "auteur": "Frère Jimmy ",
      "titre": "Vous êtes mariés ",
      "corps": [
          {
              "type": "refrain",
              "content": "Aujourd’hui vous êtes mariés, \nDevant Dieu et devant l’église, \nSoyez unis pour la vie, \nPour le meilleur et pour le pire, \nEt que personne ne sépare \nCe que Dieu a déclare joint oh \nSoyez unis pour la vie, pour le meilleur et pour le pire.\n"
          },
          {
              "type": "couplet",
              "content": "L’homme quittera son père et sa mère \nEt s’attachera à sa femme et \nIls deviendront une même chaire \nUnis par l’amour du christ, \nJe vais quitter mon père et ma mère\nEt m’attacher à ma femme oh \nEt nous deviendrons une même chaire \nUnis par l’amour du christ"
          },
          {
              "type": "couplet",
              "content": "Le mariage est une institution, \nDestinée à toi mon amour, \nTu m'as aimé tu m'a choisi\nEt tu m'as ouvert ton cœur\nAujourd'hui est un jour d'allégresse\nDieu a exaucé ma prière\nIl m'a donné\nL'os de mes os\nToi la chaire de ma chaire"
          },
          {
              "type": "refrain",
              "content": "Celui qui trouve une femme, \nIl a trouvé la chose utile pour sa vie, \nTu m'as aimé, \nTu m'as choisi, \nTu m'as ouvert ton cœur \nJe vais t’aimer jusqu’à la mort.\n\nTu ma aimé, tu ma choisi,\nEt moi je vais t’aimer \nTous les jours de ma vie  jusqu’à la mort.\n\nTu es l’os de mes os, \nToi la chaire de ma chaire"
          }
      ],
      "__v": 0
  },
  {
      "_id": "648233bb89182d742cbdbd9d",
      "auteur": "Frère Dudos",
      "titre": "Wewe ndiwe Mungu",
      "corps": [
          {
              "type": "couplet",
              "content": "Wewe ndiwe mungu juu ya miungu yote eh eh,\nNafsi yangu mimi \nIna kiu kuku abudu wewe peke yako oh ni kuabudu milele, \nMimi ni nani, hata uni kumbuke eh \nKaacha utukufu, \nNa heshima juu mbinguni, ili uniokoe eh,\nNiitwe mwana wake Mungu \n"
          },
          {
              "type": "refrain",
              "content": "Wewe hauna mwanzo wala mwisho wa maisha yako, \nMimi niko ndilo jina lako alpha na omega,\nWewe ndiwe ambaye malaika wa sifu \nViumbe vyote vyakuinamiya milele\n\n"
          },
          {
              "type": "bridge",
              "content": "\n-Twa shuka mbele \nYa kiti chako twa kuabudu, \nFazili zako \nNiza milele twa kuabudu\n"
          },
          {
              "type": "bridge",
              "content": "Twa kuabudu Bwana \nTwakuabudu, \nTwa kuinua Bwana, \nTwakuinua, \nPokea maabudu yetu, \nPokea Baba, \nPokea sifa zetu, \nPokea baba, \nMilele na\nMilele eh eh.."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6482b32afbe1e96dbea6ed9d",
      "auteur": "",
      "titre": "Wokovu wangu",
      "corps": [
          {
              "type": "couplet",
              "content": "Wokovu wangu mimi, \nNili upata kwa bure, \nSikulipa kitu chochote eh, \nLakini yesu wangu \nKwa upendo mwingi, \nKajitoa zabihu ilio hai"
          },
          {
              "type": "refrain",
              "content": "Naupenda musalaba huo, \nNguvu zake zanipa kushinda ah ah,\nNaukumbatia musalaba huo \nUlio wokovu uh\n\nWokuvu kamilifu unao toka \nKwadamu ya yesu."
          },
          {
              "type": "couplet",
              "content": "Nina matumaini \nYaku muona mokozi, \nNa kuishi naye milele, \nKatika utukufu, \nNa furaha tele, \nKwa kweli tusipo zimia roho."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6482c4a226a14992db159640",
      "auteur": "",
      "titre": "Yesu jina hilo",
      "corps": [
          {
              "type": "couplet",
              "content": "Yesu jina hilo nikubwa sana \nLenye kupita majina yote duniani, \nYesu Yesu jina hilo \nMimi nita lisifu. \nJina hilo nikubwa sana \nKupita hata malaika wa mbinguni, \nYesu yesu jina hilo \nMimi nita lisifu\n\n"
          },
          {
              "type": "refrain",
              "content": "Nakila goti likundjwe mbele zake \nNazo ndimi zikiri \nKwamba Yesu ndiye bwana \nMwokozi wa watu wote "
          },
          {
              "type": "couplet",
              "content": "Jina hilo yesu, \nLina nijaza moyo \nNinapo patikana na shida mimi, \nYesu ana zitatua, \nHitaji zangu zote, \nYeye ana zijibu uh \nKatika giza kuu la dunia hii, \nYeye ana niongoza"
          }
      ],
      "__v": 0
  }
]
const aleatoire = (min, max) => { //Pour la seection aleatoire du psaume
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const Liste = (props) => {
  const [showPsaume,setShowPsaume] = useState(true)
  const [psaume,setPsaume] = useState({})
  const { songs } = useSelector((state) => state.userReducer);
  const height = StatusBar.currentHeight
  const dispatch = useDispatch()
  useEffect(()=>{
    setPsaume(psaumes[aleatoire(0,19)])
    const fetching = async ()=>{
      const chansons = JSON.parse(await getSongs())
      if (chansons === null) dispatch(loadSongs(liste));else dispatch(loadSongs(chansons))
    }
    fetching()
  },[])
  return (
    <View style={{height:Dimensions.get('window').height-StatusBar.currentHeight-100,alignItems:'center',backgroundColor:'rgba(63,67,89,0.5)',paddingBottom:5}}>
      <ScrollView>
        {
          songs.map((item,index)=>{
            return(
              <TouchableOpacity key={index} style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height/12,backgroundColor:'rgba(63,67,89,1)',marginTop:2,justifyContent:'space-evenly'}} onPress={()=>{dispatch(setTitre(item.titre.toUpperCase()));props.navigation.navigate('Lecture',{song:item})}}>
                <Text style={{fontSize:16,fontWeight:'bold',marginLeft:10,color:'white',maxWidth:'100%'}}>{`${index+1}. ${item.titre}`}</Text>
                <Text style={{fontSize:14,fontWeight:'bold',marginLeft:10,fontStyle:'italic',color:'rgba(255,255,255,0.7)'}}>{item.auteur}</Text>
              </TouchableOpacity>
            )
          }) 
        }
      </ScrollView>
      <Overlay overlayStyle={{width:'80%',backgroundColor:'#3C4C59',padding:0,borderRadius:15}} isVisible={showPsaume} onBackdropPress={()=>setShowPsaume(false)}>
        <Text style={{fontSize:18,color:'white',fontWeight:'bold',textAlign:'center',marginTop:10,marginBottom:10}}>{psaume.verset}</Text>
        <Text style={{fontSize:18,color:'white',textAlign:'center',marginTop:10,marginBottom:10}}>{psaume.content}</Text>
      </Overlay>
    </View>
  )
}

export default Liste