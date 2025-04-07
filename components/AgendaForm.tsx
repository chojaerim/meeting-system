import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";
import { Upload } from "lucide-react";

export default function AgendaForm() {
  const [vendors, setVendors] = useState([{ name: "", price: "", file: null }]);
  const [selectionMethod, setSelectionMethod] = useState("");
  const [attachedDocs, setAttachedDocs] = useState({});

  const handleVendorChange = (index, field, value) => {
    const updated = [...vendors];
    updated[index][field] = value;
    setVendors(updated);
  };

  const addVendor = () => {
    setVendors([...vendors, { name: "", price: "", file: null }]);
  };

  const requiredDocs = {
    "여성기업": "여성기업확인서",
    "중소기업": "중소기업확인서",
    "독점기업": "단독생산증명서",
  };

  return (
    <div className="grid gap-6 max-w-3xl mx-auto p-4">
      <Card>
        <CardContent className="grid gap-4 pt-6">
          <div>
            <Label>제목</Label>
            <Input placeholder="안건 제목을 입력하세요" />
          </div>
          <div>
            <Label>사업목적</Label>
            <Textarea placeholder="사업의 목적을 입력하세요" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>사업기간</Label>
              <Input type="text" placeholder="예: 2024.3.1 ~ 2025.2.28" />
            </div>
            <div>
              <Label>사업대상</Label>
              <Input placeholder="예: 교직원, 학생 등" />
            </div>
          </div>
          <div>
            <Label>사업내용</Label>
            <Textarea placeholder="사업의 상세 내용을 입력하세요" />
          </div>
          <div className="grid gap-4">
            <Label>견적업체</Label>
            {vendors.map((vendor, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 items-end">
                <Input
                  placeholder="업체명"
                  value={vendor.name}
                  onChange={(e) => handleVendorChange(index, "name", e.target.value)}
                />
                <Input
                  placeholder="금액"
                  value={vendor.price}
                  onChange={(e) => handleVendorChange(index, "price", e.target.value)}
                />
                <Input
                  type="file"
                  onChange={(e) => handleVendorChange(index, "file", e.target.files[0])}
                />
              </div>
            ))}
            <Button variant="outline" onClick={addVendor}>+ 업체 추가</Button>
          </div>
          <div>
            <Label>업체선정방법</Label>
            <Select onValueChange={(value) => setSelectionMethod(value)}>
              <SelectItem value="수의계약">수의계약 (국계령 26조 1항 5호 가목)</SelectItem>
              <SelectItem value="여성기업">여성기업</SelectItem>
              <SelectItem value="중소기업">중소기업</SelectItem>
              <SelectItem value="독점기업">독점기업</SelectItem>
              <SelectItem value="제한경쟁입찰">제한경쟁입찰</SelectItem>
              <SelectItem value="공개입찰">공개입찰</SelectItem>
            </Select>
            {requiredDocs[selectionMethod] && (
              <div className="mt-2">
                <Label>{requiredDocs[selectionMethod]} 첨부</Label>
                <Input type="file" onChange={(e) => setAttachedDocs({ ...attachedDocs, [selectionMethod]: e.target.files[0] })} />
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>선정업체명</Label>
              <Input placeholder="최종 선정된 업체명을 입력하세요" />
            </div>
            <div>
              <Label>금액</Label>
              <Input placeholder="예: 9,900,000원" />
            </div>
          </div>
          <div>
            <Label>계정과목</Label>
            <Input placeholder="예: 홍보비(커뮤니케이션팀)" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
