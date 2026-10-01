# Hardware Mobile

Aplicativo escolar em React Native com Expo Router. As telas demonstram câmera, acelerômetro, GPS, gravação de áudio e notificações locais. A configuração atual usa Expo SDK 57 e os módulos nativos compatíveis indicados pelo `npx expo install`.

## Estrutura

```text
hardware/
├── app/
│   ├── _layout.js
│   ├── index.js
│   ├── camera.js
│   ├── acelerometro.js
│   ├── gps.js
│   ├── audio.js
│   └── notification.js
├── components/
│   ├── Screen.js
│   └── buttom.js
├── assets/
│   ├── explosion.mp3
│   ├── cartoon-boing.mp3
│   └── short-beep.wav
├── app.json
├── package.json
└── README.md
```

Cada arquivo de tela em `app/` implementa uma rota do Expo Router. `components/Screen.js` fornece cabeçalho e botão de retorno compartilhados.

O efeito de explosão é [“Explosion 1”](https://freesound.org/people/magnuswaker/sounds/523089/), de magnuswaker, CC0 1.0. O boing é [“Cartoon Boing.wav”](https://freesound.org/people/reelworldstudio/sounds/161122/), de reelworldstudio, CC0 1.0. O bip é um efeito local curto.

## Criar e executar

Use uma versão do Expo Go compatível com a SDK selecionada pelo projeto. Ao criar um projeto novo, o instalador do Expo escolhe versões dos módulos nativos compatíveis com a SDK instalada.

```sh
npx create-expo-app@latest hardware --template blank
cd hardware
npx expo install expo-router expo-camera expo-sensors expo-location expo-audio expo-notifications expo-haptics expo-linking expo-constants expo-status-bar expo-asset react-native-safe-area-context react-native-screens react-dom
npx expo start
```

No projeto criado, configure `"main": "expo-router/entry"` no `package.json`, adicione os plugins e textos de permissão definidos em `app.json` e crie a árvore `app/` e os arquivos acima. Para abrir no tablet, instale/atualize o Expo Go, conecte computador e tablet à mesma rede e leia o QR code exibido pelo `npx expo start`. Se as dependências forem alteradas, confira com:

```sh
npx expo install --check
npx expo-doctor
```

## Checklist no tablet

- **Home:** confirmar título, descrição, cinco cards e abertura de cada tela; observar a resposta tátil dos botões.
- **Câmera:** conceder permissão, conferir a prévia, alternar frontal/traseira, tirar foto e confirmar que aparece abaixo da prévia.
- **Acelerômetro:** inclinar o tablet, conferir X/Y/Z mudando e a bolinha acompanhando o movimento; voltar à Home e confirmar que o sensor para de atualizar.
- **GPS:** conceder permissão, obter latitude, longitude e precisão; abrir no Google Maps. Repetir negando a permissão e conferir a mensagem clara.
- **Áudio:** tocar os efeitos prontos, gravar alguns segundos, parar e ouvir a gravação. Repetir negando o microfone.
- **Notificação:** conceder permissão, agendar e aguardar cinco segundos; verificar a notificação com o app aberto e em segundo plano. Repetir negando a permissão.
- **Navegação:** voltar à Home em cada tela e repetir em orientação/área de tela compatível com o tablet.

## Problemas comuns

- **Expo Go informa incompatibilidade de SDK:** atualize o Expo Go pela loja do tablet e rode `npx expo install --check`; não force versões com `npm install`.
- **Aviso de notificações a partir da SDK 53:** no Expo Go para Android, a limitação é para push remoto. Notificações locais, como a que este app agenda após 5 segundos, continuam disponíveis; elas não precisam de servidor ou token push. Push remoto exige um development build.
- **Permissão negada ou diálogo não reaparece:** ative câmera, microfone, localização ou notificações nas configurações do sistema. Em algumas plataformas, depois de negar é necessário alterar a permissão manualmente.
- **GPS sem resultado:** ative os serviços de localização, teste ao ar livre e aguarde alguns segundos. Emuladores podem precisar de uma posição simulada.
- **Câmera indisponível:** teste em um dispositivo físico e feche outros apps que possam estar usando a câmera; alguns simuladores não têm câmera funcional.
- **Notificação não aparece no Android:** permita notificações nas configurações do sistema e confirme que o canal local não está silenciado. O handler da aplicação permite exibição em primeiro plano.
- **Mudanças de permissões nativas não aparecem:** reinicie o Expo Go. Alterações em textos nativos do `app.json` se aplicam ao gerar um novo binário de desenvolvimento ou de loja; o Expo Go continua usando o próprio binário.