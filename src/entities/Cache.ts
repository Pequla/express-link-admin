import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uq_cache_uuid", ["uuid"], { unique: true })
@Entity("cache", { schema: "data_link" })
export class Cache {
  @PrimaryGeneratedColumn({ type: "int", name: "cache_id", unsigned: true })
  cacheId: number;

  @Column("varchar", { name: "uuid", unique: true, length: 255 })
  uuid: string;

  @Column("varchar", { name: "username", length: 255 })
  username: string;

  @Column("datetime", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
