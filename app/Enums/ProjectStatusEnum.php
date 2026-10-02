<?php

namespace App\Enums;

enum ProjectStatusEnum: string
{
    case PENGING = 'pending';
    case COMPLETED = 'completed';
    case ONGOING = 'ongoing';
}
