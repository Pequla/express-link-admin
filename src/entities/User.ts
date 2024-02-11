import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Admin } from "./Admin";
import { Ban } from "./Ban";
import { Data } from "./Data";

@Index("uq_user_discord_id", ["discordId"], { unique: true })
@Entity("user", { schema: "data_link" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", { name: "discord_id", unique: true, length: 255 })
  discordId: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToMany(() => Admin, (admin) => admin.user)
  admins: Admin[];

  @OneToMany(() => Ban, (ban) => ban.admin)
  bans: Ban[];

  @OneToOne(() => Ban, (ban) => ban.user)
  ban: Ban;

  @OneToMany(() => Data, (data) => data.user)
  data: Data[];
}
