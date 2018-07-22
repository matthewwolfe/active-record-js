import EnumColumn from 'migrations/columns/EnumColumn';
import { ColumnType } from 'migrations/constants';


describe('EnumColumn', () =>
{
    test('values and default', () =>
    {
        const column = new EnumColumn('status', ColumnType.ENUM, {
            default: 'pending',
            values: ['pending', 'succeeded', 'failed']
        });

        expect(column.toString()).toEqual("`status` ENUM ( 'pending', 'succeeded', 'failed' ) NULL DEFAULT 'pending'");
    });
})
