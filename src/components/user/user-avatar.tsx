import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  name: string | null | undefined;
};
export default function UserAvatar({ name }: Props) {
  return (
    <Avatar>
      <AvatarImage
        alt={`Avatar for ${name}`}
        src={`https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=${name}`}
      />
      <AvatarFallback>{name?.[0]}</AvatarFallback>
    </Avatar>
  );
}
