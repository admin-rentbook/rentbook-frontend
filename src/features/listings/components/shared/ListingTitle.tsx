type ListingTitleProps = {
  title: string;
  description: string;
};

export const ListingTitle = ({ description, title }: ListingTitleProps) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-heading text-black-500 leading-snug">{title}</h1>
      <p className="text-body-base-normal text-black-400">{description}</p>
    </div>
  );
};
