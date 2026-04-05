export function drawOne(player) {
  if (player.deck.length === 0 && player.discard.length > 0) {
    player.deck = player.discard.splice(0);
  }
  if (player.deck.length > 0) {
    player.hand.push(player.deck.shift());
  }
}

export function playCard(state, playerId, cardId) {
  const player = state.players.find((p) => p.id === playerId);
  const cardIndex = player.hand.findIndex((card) => card.id === cardId);
  if (cardIndex < 0) throw new Error('Card not found in hand');
  const [card] = player.hand.splice(cardIndex, 1);

  if (card.effect.bonus_income) {
    player.resources.credits += card.effect.bonus_income;
  }

  if (card.effect.gain_resource) {
    const res = card.effect.gain_resource;
    player.resources[res] = (player.resources[res] ?? 0) + (card.effect.amount ?? 1);
  }

  player.discard.push(card);
  state.log.push({ type: 'CARD_PLAYED', playerId, cardId: card.id });
}
