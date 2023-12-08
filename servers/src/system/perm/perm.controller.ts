import { Controller, Get, Req } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'

import { ApiResult } from '../../common/decorators/api-result.decorator'
import { ResultData } from '../../common/utils/result'

import { MenuEntity } from '../menu/menu.entity'

import { PermService } from './perm.service'
import { RouteDto } from './dto/route.dto'

@ApiTags('权限路由')
@ApiBearerAuth()
@Controller('perm')
export class PermController {
  constructor(private readonly permService: PermService) {}

  @Get('all')
  @ApiOperation({ summary: '获取app 所有路由' })
  @ApiResult(RouteDto)
  async findAppAllRoutes(): Promise<ResultData> {
    return await this.permService.findAppAllRoutes()
  }

  @Get('user')
  @ApiOperation({ summary: '获取用户权限所有接口路由列表' })
  @ApiResult(RouteDto, true)
  async findUserRoutes(@Req() req): Promise<ResultData> {
    const appRoutes = await this.permService.findUserPerms(req.user.id)
    return ResultData.ok(appRoutes)
  }

  @Get('menu')
  @ApiOperation({ summary: '用户权限' })
  @ApiResult(MenuEntity, true)
  async findUser(@Req() req): Promise<ResultData> {
    const menuPerms = await this.permService.findUserMenus(req.user.id, req.user.type)
    return ResultData.ok(menuPerms)
  }
}
