import { Image } from "react-native";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";


type AnimeCardProps = {
  id: string;
  title: string;
  cover_image: string;
};

const AnimeCard = (props: AnimeCardProps) => {
  return (
    <Link href={{
      pathname: '/(anime)/details/[id]',
      params: { id: props.id }
    }}>
      <Image source={{ uri: props.cover_image }} style={{ width: 100, height: 150 }} />
      <ThemedText>{props.title}</ThemedText>
    </Link>
  );
};

export default AnimeCard;
