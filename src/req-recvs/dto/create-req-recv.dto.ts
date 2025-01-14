export class CreateReqRecvDto {
  status:
    | 'รอดำเนินการ'
    | 'กำลังดำเนินการ'
    | 'ขอข้อมูลเพิ่มเติม'
    | 'อนุมัติ'
    | 'ไม่อนุมัติ';
  sentAt: Date;
  respondedAt: Date;
  userId: number;
  requestId: number;
}
