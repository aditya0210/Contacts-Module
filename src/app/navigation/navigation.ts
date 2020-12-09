import { FuseNavigation } from '@fuse/types';
import { TranslatePipe } from '@ngx-translate/core';

export const navigation: FuseNavigation[] = [
    {
        id: 'info',
        title: 'Contact',
        type: 'item',
        icon: 'dashboard',
        url: '/dashboard',
    },
    // {
    //     id: 'Request',
    //     title: 'Request',
    //     translate: 'navigation.Request',
    //     type: 'collapsable',
    //     icon: 'announcement',
    //     children: [
    //         {
    //             id: 'Info',
    //             title: 'Profile Status',
    //             translate: 'profileStatus',
    //             type: 'item',
    //             icon: 'mood',
    //             url: '/library/profile_status',
    //         },
    //         {
    //             id: 'Info',
    //             title: 'Inventory Status',
    //             translate: 'inventoryStatus',
    //             type: 'item',
    //             icon: "web_asset",
    //             url: '/library/inventory_status'
    //         },
    //         {
    //             id: 'Info',
    //             title: 'Leave Status',
    //             translate: 'navigation.Leave Status',
    //             type: 'item',
    //             icon: 'event_available',
    //             url: '/library/leave_status',
    //         },
    //         {
    //             id: 'Info',
    //             title: 'Attendance',
    //             translate: 'navigation.Attendance',
    //             type: 'item',
    //             icon: 'cast_for_education',
    //             url: '/library/attendance',
    //         },
    //     ],
    // },
    // {
    //     id: 'info',
    //     title: 'Category',
    //     translate: 'Navigation.Category',
    //     type: 'collapsable',
    //     icon: 'school',
    //     children: [
    //         {
    //             id: 'Add Category',
    //             title: 'Add Category',
    //             translate: 'Navigation.AddCategory',
    //             type: 'item',
    //             icon: 'category',
    //             url: '/library/category',
    //         },
    //         {
    //             id: 'Add Sub-Category',
    //             title: 'Add Sub-Category',
    //             translate: 'Navigation.AddSub-Category',
    //             type: 'item',
    //             icon: 'category',
    //             url: '/library/sub-category',
    //         }
    //     ]

    // },
    // {
    //     id: 'info',
    //     title: 'Books',
    //     type: 'collapsable',
    //     translate: 'Navigation.Books',
    //     icon: 'admin_panel_settings',
    //     children: [
    //         {
    //             id: 'New Books',
    //             title: 'New Books',
    //             translate: 'Navigation.NewBook',
    //             type: 'item',
    //             icon: 'add_task',
    //             url: '/library/new-books',
    //         },
    //         {
    //             id: 'Available Books',
    //             title: 'Available Books',
    //             translate: 'Navigation.AvailableBooks',
    //             type: 'item',
    //             icon: 'library_books',
    //             url: '/library/available-books',
    //         },
    //         {
    //             id: 'Issue Books',
    //             title: 'Issued Books',
    //             translate: 'Navigation.IssuedBooks',
    //             type: 'item',
    //             icon: 'library_books',
    //             url: '/library/issue-books',
    //         },
    //         {
    //             id: 'Assign Books',
    //             title: 'Assign Books',
    //             translate: 'Navigation.AssignBooks',
    //             type: 'item',
    //             icon: 'library_books',
    //             url: '/library/assign-books',
    //         },
    //         {
    //             id: 'Return Books',
    //             title: 'Return Books',
    //             translate: 'Navigation.ReturnBooks',
    //             type: 'item',
    //             icon: 'library_books',
    //             url: '/library/return-books',
    //         }

    //     ]

    // },
    // {
    //     id: 'Students List',
    //     title: 'Add Fine',
    //     translate: 'addFine',
    //     type: 'item',
    //     icon: 'class',
    //     url: 'library/add-fine'
    // },
];
