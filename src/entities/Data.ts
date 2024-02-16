import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Guild } from "./Guild";
import { User } from "./User";

@Index("fk_data_guild_idx", ["guildId"], {})
@Index("fk_data_user_idx", ["userId"], {})
@Entity("data", { schema: "data_link" })
export class Data {
  @PrimaryGeneratedColumn({ type: "int", name: "data_id", unsigned: true })
  dataId: number;

  @Column("varchar", { name: "uuid", length: 255 })
  uuid: string;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @Column("int", { name: "guild_id", unsigned: true })
  guildId: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Guild, (guild) => guild.data, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "guild_id", referencedColumnName: "guildId" }])
  guild: Guild;

  @ManyToOne(() => User, (user) => user.data, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
