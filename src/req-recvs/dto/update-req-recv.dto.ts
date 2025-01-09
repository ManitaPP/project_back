import { PartialType } from '@nestjs/mapped-types';
import { CreateReqRecvDto } from './create-req-recv.dto';

export class UpdateReqRecvDto extends PartialType(CreateReqRecvDto) {}
