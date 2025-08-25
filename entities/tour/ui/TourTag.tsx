interface TourTagProps {
  tag: string;
}

export function TourTag({ tag }: TourTagProps) {
  return (
    <span className='rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-sm'>
      {tag}
    </span>
  );
}
