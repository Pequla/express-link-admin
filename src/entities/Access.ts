import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("access", { schema: "data_link" })
export class Access {
  @PrimaryGeneratedColumn({ type: "int", name: "access_id", unsigned: true })
  accessId: number;

  @Column("varchar", { name: "address", length: 255 })
  address: string;

  @Column("varchar", { name: "path", length: 255 })
  path: string;

  @Column("varchar", { name: "method", length: 255 })
  method: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
