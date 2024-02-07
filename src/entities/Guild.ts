import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Data } from "./Data";

@Index("uq_guild_discord_id", ["discordId"], { unique: true })
@Entity("guild", { schema: "data_link" })
export class Guild {
  @PrimaryGeneratedColumn({ type: "int", name: "guild_id", unsigned: true })
  guildId: number;

  @Column("varchar", { name: "discord_id", unique: true, length: 255 })
  discordId: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToMany(() => Data, (data) => data.guild)
  data: Data[];
}
