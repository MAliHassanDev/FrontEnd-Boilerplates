interface AvatarProps {
  img?: string;
}

export const Avatar = ({
  img = "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp",
}: AvatarProps) => {
  return (
    <div className="avatar">
      <div className="ring-primary ring-offset-base-100 w-14 rounded-full ring-2 ring-offset-2">
        <img src={img} />
      </div>
    </div>
  );
};
