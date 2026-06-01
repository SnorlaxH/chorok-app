import Badge from "@/components/common/Badge";
import Image from "next/image";
import IconButton from "@/components/common/IconButton";
import { getDday } from "@/libs/utils";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-10 py-32 px-4 lg:px-16">
      <Image loading="eager" className="left-10 rounded-full border-(--main-color) border-3 shadow-2xl" src="/images/profile.jpg" alt="Profile" width={240} height={120} />
      <h4 className="text-4xl text-(--main-deep-color) text-shadow-lg text-shadow-(color:--main-color) font-(family-name:--font-kedu-line)">타쵸쵸</h4>
      <div className="flex gap-2">
        <Badge
          color="--samsung-blue-color">
          🦁 삼성
        </Badge>
        <Badge
          color="#C83A3A">
          니케
        </Badge>
        <Badge
          color="--sub-color">
          쵸딩
        </Badge>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap justify-center gap-4">
          <Badge
            color="--point-color"
            className="text-white">
            데뷔 2024. 03. 30({getDday('2024. 03. 30', 1)}일 째)
          </Badge>
          <Badge
            color="#B22222"
            className="text-white">
            루키존 2024. 12. 20({getDday('2024. 12. 20')}일 전)
          </Badge>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Badge
            color="#00A2E8"
            className="text-white">
            스포츠 2025. 05. 08({getDday('2025. 05. 08')}일 전)
          </Badge>
          <Badge
            color="#b5E61D"
            className="text-white">
            베스트 2025. 06. 30({getDday('2025. 06. 30')}일 전)
          </Badge>
        </div>
      </div>
      <div className="w-full mt-4 grid grid-cols-2 gap-4">
        <IconButton
          icon={<Image src="/images/soop.svg" alt="Profile" width={32} height={32}/>}
          title="SOOP"
          desc="라이브 방송"
          url="https://ch.sooplive.com/station/tachocho">
        </IconButton>
        <IconButton
          icon={<Image src="/images/cafe.png" alt="Cafe" width={32} height={32}/>}
          title="팬카페"
          desc="네이버 카페"
          url="https://cafe.naver.com/tachocho">
        </IconButton>
        <IconButton
          icon={<Image src="/images/youtube.png" alt="Youtube" width={32} height={32}/>}
          title="유튜브"
          desc="KBO 리뷰"
          url="https://www.youtube.com/@tachocho">
        </IconButton>
        <IconButton
          icon={<Image src="/images/fancim.png" alt="Fancim" width={32} height={32}/>}
          title="팬심"
          desc="팬심 프로필"
          url="https://fancim.me/celeb/profile.aspx?url=212401">
        </IconButton>
        <IconButton
          icon={<Image src="/images/x.png" alt="Twitter" width={30} height={30}/>}
          title="X(트위터)"
          desc="@chucho_cho"
          url="https://x.com/chucho_cho">
        </IconButton>
      </div>
    </div>
  );
}
