import { Pokemon } from "@/types/pokemon"
import { PokemonList } from "../_resources/pokemon-list"

interface Props {
  pokemonsPromise: Promise<Pokemon[]>
}

export default async function PokemonView({ pokemonsPromise }: Props) {
  const pokemons = await pokemonsPromise
  return <PokemonList data={pokemons} />
}
