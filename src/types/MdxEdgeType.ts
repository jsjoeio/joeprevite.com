import { Defined } from './Defined';
import { ArticlesPageQuery } from './generated';

export type MdxEdgeType = Defined<Defined<ArticlesPageQuery['allMdx']>['edges']> extends (infer T)[] ? T : never;