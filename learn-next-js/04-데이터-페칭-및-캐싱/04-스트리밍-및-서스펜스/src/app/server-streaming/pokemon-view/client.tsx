'use client'

import { use } from "react"

import { Pokemon } from "@/types/pokemon"
import { PokemonList } from "../_resources/pokemon-list"

interface Props {
  pokemonsPromise: Promise<Pokemon[]>
}

export default function PokemonView({ pokemonsPromise }: Props) {
  const pokemons = use(pokemonsPromise)
  return <PokemonList data={pokemons} />
}
