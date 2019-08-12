export default function() {
  return [
    {
      title: "Dashboard",
      to: "/dashboard",
      htmlBefore: '<i class="mdi mdi-view-dashboard"></i>',
      htmlAfter: "",
    },
    {
      title: "Barber",
      to: "/barber",
      htmlBefore: '<i class="mdi mdi-content-cut"></i>'
    },
    {
      title: "Price Set",
      to: "/price",
      htmlBefore: '<i class="mdi mdi-cash"></i>'
    },
    {
      title: "Coupon",
      to: "/coupon",
      htmlBefore: '<i class="mdi mdi-ticket-percent"></i>'
    },
    {
      title: "User",
      to: "/user",
      htmlBefore: '<i class="mdi mdi-account"></i>'
    },
    {
      title: "Statement",
      to: '/statement',
      htmlBefore: '<i class="mdi mdi-note"></i>',
    },
    {
      title: "Settings",
      htmlBefore: '<i class="mdi mdi-settings"></i>',
      children: [
        {
          title: 'Site Settings',
          to: '/settings'
        },
        {
          title: 'Role',
          to: '/role'
        },
        {
          title: 'Permission',
          to: '/permission'
        }
      ]
    },
  ];
}
