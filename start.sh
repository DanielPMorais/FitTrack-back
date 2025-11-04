#!/bin/bash

# Carrega o nvm se estiver disponível
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  source "$HOME/.nvm/nvm.sh"
fi

# Inicia o servidor
node src/server.js

