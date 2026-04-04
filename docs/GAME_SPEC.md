# Trade Wars: Sol – Initial Game Specification

## Core Concept
Trade Wars: Sol is a two-player turn-based strategy game set in a colonized Solar System. Players expand across planets, moons, and space stations, build fleets, control trade routes, and use cards to gain advantages or disrupt opponents. Victory is achieved through victory points earned from territory control, trade routes, and strategic actions.

## Primary Victory Conditions
Players earn Victory Points (VP) from:
- Colonies
- Major planetary control
- Space stations
- Trade routes
- Destroying enemy fleets
- Certain cards and events

Game ends when:
- A player reaches the VP threshold, or
- The final round ends and the highest VP wins

## Turn Structure
Each turn consists of:
1. Draw Cards
2. Collect Income
3. Movement Phase (fleets move between connected nodes)
4. Combat Phase (if opposing fleets share a location or route)
5. Build Phase (colonies, stations, fleets)
6. Card Phase (play cards)
7. Scoring Phase (update victory points)
8. End Turn

## Map Model
The board is a network of nodes and routes.

### Node Types
- Planet
- Moon
- Space Station
- Shipyard
- Mining Site
- Trade Hub
- Research Station

Nodes can be owned and may generate resources or income.

### Routes
Routes connect nodes. Controlling both endpoints or maintaining fleet presence can grant control of a trade route.

## Fleets
Fleets represent military and transport capacity.

Initial fleet attributes:
- Attack value
- Defense value
- Movement range

Combat can initially be resolved using a simple strength comparison plus randomness.

## Cards
Cards fall into categories:
- Resource cards
- Event cards
- Action cards
- Technology cards (later expansion)

Cards can provide resources, temporary bonuses, sabotage effects, or special actions.

## Economy
Players earn income from:
- Colonies
- Trade routes
- Stations
- Certain cards

Income can be used to build fleets, colonies, and stations.

## Solo Mode
A bot player should:
- Expand into unowned territory
- Protect trade routes
- Build fleets when weak
- Attack weak targets
- Play cards opportunistically

## v1 Scope
Version 1 should include:
- Fixed Solar System map
- Fleets and movement
- Territory ownership
- Trade routes
- Income and building
- Basic combat
- Basic card system
- Solo bot opponent

## Post-v1 Expansion Ideas
- Technology tree
- Multiple factions
- Fog of war
- Diplomacy
- Missions
- Campaign mode
- Online multiplayer
- Random map generator
