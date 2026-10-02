<?php

namespace App\Enums;

enum TaskStatusEnum: string
{
    case PENGING = 'pending';
    case COMPLETED = 'completed';
    case ONGOING = 'ongoing';
}
