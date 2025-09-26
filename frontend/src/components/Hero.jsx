import hero from '../assets/hero.jpg'

export default function Hero() {
  return (
    <div className="relative h-[600px] w-full">
      <img
        src={hero}
        alt="Hero"
        className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/50">
      
      </div>
    </div>
  )
}