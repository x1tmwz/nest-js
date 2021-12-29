import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
    name:"work-day-summary",

  expression: `
    (select table1.id as monsterId,date(table2.date) as date,table2.doors as doors,table2.energy,100 + (TIMESTAMPDIFF(YEAR,date(table1.date),date(table2.date))*20) as exp from intimidators_user as table1
join
(SELECT table1.monsterId,table1.date,group_concat(table2.name) as doors,count(*) * 20 as energy FROM test.work_day as table1 join (select * from door) as table2 on table1.doorId = table2.id group by table1.monsterId,date(table1.date)) as table2
on table1.id = table2.monsterId)
    `,
})
export class WorkDaySummary {
    @ViewColumn()
    monsterId:number

    @ViewColumn()
    date:string

    @ViewColumn()
    doors:string

    @ViewColumn()
    energy:number

    @ViewColumn()
    exp:number

}
