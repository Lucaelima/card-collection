import { YuGiOhApi } from "@/types/CardsApi";
import { IYuGiOh } from "@/types/ICards";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php");
    const data = await res.json();

    const cards: IYuGiOh[] = (data.data as YuGiOhApi[]).map((card) => ({
      id: card.id,
      name: card.name,
      type: card.type,
      frameType: card.frameType,
      desc: card.desc,
      atk: card.atk,
      def: card.def,
      level: card.level,
      race: card.race,
      attribute: card.attribute,
      scale: card.scale,
      linkval: card.linkval,
      image_url: card.card_images[0]?.image_url || null,
    }));

    return NextResponse.json({ cards });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Erro ao buscar cartas";
    console.error("Erro no endpoint:", err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
