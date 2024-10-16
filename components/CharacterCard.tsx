import { Image } from "react-native";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";


type CharacterCardProps = {
  id: string;
  name: string;
  cover_image: string;
};

const CharacterCard = (props: CharacterCardProps) => {
  return (
    <Link href={{
      pathname: '/(character)/details/[id]',
      params: { id: props.id }
    }}>
      <Image source={{ uri: props.cover_image }} style={{ width: 100, height: 150 }} />
      <ThemedText>{props.name}</ThemedText>
    </Link>
  );
};

export default CharacterCard;
