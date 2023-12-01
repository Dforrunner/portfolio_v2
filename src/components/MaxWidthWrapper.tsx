export default function MaxWidthWrapper({ children }: { children: React.ReactNode }) {
  return <div className='lg:w-[1000px] lg:max-w-[1000px]'>{children}</div>;
}
